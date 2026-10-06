#!/usr/bin/env bash
set -euo pipefail

#
# Deploy the static Executive Founders landing to the shared Lightsail box.
#
# The target (54.216.156.219) also serves commodintel.com, tradingbot,
# gapscanner, compliance/velusian.com and cockpit. Every step below exists so
# this deploy cannot collide with them:
#
#   host identity  pinned host key (deploy/known_hosts) + hostname check
#   registry       /etc/deploy-registry: refuses domains/paths another app owns
#   nginx          refuses if another loaded vhost claims our server_name;
#                  a baseline `nginx -t` must pass before anything is touched;
#                  if the new vhost fails `nginx -t` the previous one is put
#                  back; only ever `reload`, never `restart`
#   files          releases under /var/www/ef-landing-releases/; the docroot is
#                  a symlink swapped atomically; nothing outside our paths is
#                  written or removed
#   system         prerequisites are checked, never installed
#   certbot        only ever `--cert-name executivefounders.com`
#   concurrency    flock on the server
#   neighbours     HTTPS status of every other vhost and state of every
#                  container, before and after; any change is reported
#
# Usage:
#   ./deploy.sh --check        preflight only, changes nothing — run it first
#   ./deploy.sh                build locally and deploy
#   ./deploy.sh --issue-cert   deploy, obtaining the certificate first if it is
#                              missing (DNS must already point at the target)
#   ./deploy.sh --rollback     point the docroot back at the previous release
#
# Another target: set SERVER_IP, SSH_KEY and EXPECTED_HOSTNAME together and add
# the host's key to deploy/known_hosts.
#

SERVER_IP="${SERVER_IP:-54.216.156.219}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/LightsailDefaultKey-commodintel-2gb.pem}"
EXPECTED_HOSTNAME="${EXPECTED_HOSTNAME:-ip-172-26-7-187.eu-west-1.compute.internal}"
SSH_USER="ec2-user"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-info@executivefounders.com}"

APP_ID="ef-landing"
DOMAINS="executivefounders.com www.executivefounders.com"
DOCROOT="/var/www/ef-landing"
RELEASES_DIR="/var/www/ef-landing-releases"
NGINX_CONF_NAME="executivefounders.com.conf"
KEEP_RELEASES=5

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "${DEPLOY_DIR}/.." && pwd)"
KNOWN_HOSTS="${DEPLOY_DIR}/known_hosts"

MODE="deploy"
ISSUE_CERT=0
case "${1:-}" in
    "")           ;;
    --check)      MODE="check" ;;
    --rollback)   MODE="rollback" ;;
    --issue-cert) ISSUE_CERT=1 ;;
    *)
        echo "Usage: $0 [--check | --rollback | --issue-cert]" >&2
        exit 2
        ;;
esac

SSH_OPTS=(
    -i "${SSH_KEY}"
    -o BatchMode=yes
    -o ConnectTimeout=15
    -o StrictHostKeyChecking=yes
    -o UserKnownHostsFile="${KNOWN_HOSTS}"
    -o GlobalKnownHostsFile=/dev/null
)
ssh_run() { ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SERVER_IP}" "$@"; }

# --- Local prerequisites ----------------------------------------------------
if [[ ! -f "${SSH_KEY}" ]]; then
    echo "ERROR: SSH key not found at ${SSH_KEY}" >&2
    exit 1
fi
if ! grep -q "^${SERVER_IP} " "${KNOWN_HOSTS}" 2>/dev/null; then
    echo "ERROR: no pinned host key for ${SERVER_IP} in ${KNOWN_HOSTS}" >&2
    exit 1
fi
if [[ "${MODE}" == "deploy" ]] && ! command -v pnpm > /dev/null 2>&1; then
    echo "ERROR: pnpm is required for the local build." >&2
    exit 1
fi

LOCAL_TMP="$(mktemp -d)"
REMOTE_TMP=""
cleanup() {
    rm -rf "${LOCAL_TMP}"
    # The remote script removes its own temp dir; this covers a failure
    # before it ran (e.g. the upload).
    if [[ -n "${REMOTE_TMP}" ]]; then
        ssh_run "rm -rf '${REMOTE_TMP}'" 2>/dev/null || true
    fi
}
trap cleanup EXIT

SOURCE="git:$(git -C "${PROJECT_DIR}" rev-parse --short HEAD 2>/dev/null || echo unknown)"
if [[ -n "$(git -C "${PROJECT_DIR}" status --porcelain -- . 2>/dev/null)" ]]; then
    SOURCE="${SOURCE}-dirty"
fi

echo ""
echo "============================================"
echo "  Executive Founders landing — ${MODE}"
echo "  Server: ${SERVER_IP} (${EXPECTED_HOSTNAME})"
echo "  Source: landing-ef ${SOURCE}"
echo "============================================"

# --- Build ------------------------------------------------------------------
if [[ "${MODE}" == "deploy" ]]; then
    echo ""
    echo ">>> Building static site locally..."
    cd "${PROJECT_DIR}"
    pnpm install --frozen-lockfile --silent
    pnpm build
    if [[ ! -f "${PROJECT_DIR}/dist/index.html" ]]; then
        echo "ERROR: dist/index.html not produced by build." >&2
        exit 1
    fi
    tar czf "${LOCAL_TMP}/release.tar.gz" -C "${PROJECT_DIR}" dist "deploy/nginx/${NGINX_CONF_NAME}"
    echo "    Package size: $(du -sh "${LOCAL_TMP}/release.tar.gz" | cut -f1)"
fi

# --- Upload -----------------------------------------------------------------
echo ""
echo ">>> Connecting (pinned host key)..."
REMOTE_TMP="$(ssh_run 'mktemp -d /tmp/ef-landing.XXXXXXXX')"
if [[ ! "${REMOTE_TMP}" =~ ^/tmp/ef-landing\.[A-Za-z0-9]{8}$ ]]; then
    echo "ERROR: unexpected remote temp dir '${REMOTE_TMP}'" >&2
    REMOTE_TMP=""
    exit 1
fi
if [[ "${MODE}" == "deploy" ]]; then
    scp -q "${SSH_OPTS[@]}" "${LOCAL_TMP}/release.tar.gz" "${SSH_USER}@${SERVER_IP}:${REMOTE_TMP}/release.tar.gz"
fi

# --- Remote ------------------------------------------------------------------
REMOTE_ENV="$(printf '%q ' \
    "MODE=${MODE}" "ISSUE_CERT=${ISSUE_CERT}" "REMOTE_TMP=${REMOTE_TMP}" \
    "SERVER_IP=${SERVER_IP}" "EXPECTED_HOSTNAME=${EXPECTED_HOSTNAME}" \
    "APP_ID=${APP_ID}" "DOMAINS=${DOMAINS}" "DOCROOT=${DOCROOT}" \
    "RELEASES_DIR=${RELEASES_DIR}" "NGINX_CONF_NAME=${NGINX_CONF_NAME}" \
    "KEEP_RELEASES=${KEEP_RELEASES}" "CERTBOT_EMAIL=${CERTBOT_EMAIL}" \
    "SOURCE=${SOURCE}")"

set +e
ssh_run "env ${REMOTE_ENV} bash -s" <<'REMOTE'
set -euo pipefail
trap 'rm -rf "${REMOTE_TMP}"' EXIT

say()  { echo "    $*"; }
die()  { printf '    ABORT: %b\n' "$*" >&2; exit 1; }

CONF_PATH="/etc/nginx/conf.d/${NGINX_CONF_NAME}"
MARKER="managed-by: landing-ef/deploy/deploy.sh"
RELEASES_MARKER="${RELEASES_DIR}/.managed-by-ef-landing"
REGISTRY="/etc/deploy-registry"
PRIMARY="${DOMAINS%% *}"
CERT_DIR="/etc/letsencrypt/live/${PRIMARY}"
OWN_PATHS="${DOCROOT},${RELEASES_DIR},${CONF_PATH}"

echo ""
echo ">>> Preflight"

# 1. Right machine.
[[ "$(hostname)" == "${EXPECTED_HOSTNAME}" ]] \
    || die "connected to $(hostname), expected ${EXPECTED_HOSTNAME}"
say "host: $(hostname)"

# 2. One deploy at a time.
exec 9>/tmp/ef-landing-deploy.lock
flock -n 9 || die "another ef-landing deploy is running on this host"

# 3. Prerequisites — checked, never installed on a shared host.
for bin in nginx certbot curl openssl flock; do
    command -v "${bin}" > /dev/null 2>&1 || sudo -n test -x "/usr/sbin/${bin}" \
        || die "${bin} missing — install it by hand; this script never installs on a shared host"
done
sudo -n true 2>/dev/null || die "passwordless sudo is not available"
# certbot lives in /usr/local/bin here, which is not on sudo's secure_path.
CERTBOT="$(command -v certbot || true)"
[[ -n "${CERTBOT}" ]] || die "certbot not on PATH"
if ! NGINX_OUT="$(sudo nginx -t 2>&1)"; then
    echo "${NGINX_OUT}" >&2
    die "nginx -t fails BEFORE this deploy changed anything — another app's config is broken; refusing to reload on top of it"
fi
say "nginx -t baseline: ok"

DOCKER="docker"
${DOCKER} ps > /dev/null 2>&1 || DOCKER="sudo docker"

# 4. Our vhost file, if present, must be ours.
if sudo test -e "${CONF_PATH}" && ! sudo grep -q "${MARKER}" "${CONF_PATH}"; then
    die "${CONF_PATH} exists and is not managed by this script"
fi

# 5. No other loaded vhost may claim our domains.
NGINX_DUMP="$(sudo nginx -T 2>/dev/null)"
CONFLICTS="$(awk -v own="${CONF_PATH}" -v domains="${DOMAINS}" '
    BEGIN { n = split(domains, d, " "); for (i = 1; i <= n; i++) want[d[i]] = 1 }
    /^# configuration file / { file = $4; sub(/:$/, "", file); next }
    $1 == "server_name" && file != own {
        for (i = 2; i <= NF; i++) { t = $i; sub(/;$/, "", t); if (t in want) print "      " file ": " t }
    }' <<< "${NGINX_DUMP}" | sort -u)"
[[ -z "${CONFLICTS}" ]] || die "other vhosts already claim our domains:\n${CONFLICTS}"
say "server_name: no other vhost claims ${DOMAINS}"

# 6. Registry: nobody else owns our domains or paths.
if sudo test -f "${REGISTRY}"; then
    REG_CONFLICTS="$(awk -v me="${APP_ID}" -v domains="${DOMAINS}" -v paths="${OWN_PATHS}" '
        BEGIN {
            n = split(domains, d, " "); for (i = 1; i <= n; i++) wd[d[i]] = 1
            m = split(paths, p, ",");   for (i = 1; i <= m; i++) wp[p[i]] = 1
        }
        /^#/ || NF == 0 || $1 == me { next }
        {
            k = split($6, ds, ","); for (i = 1; i <= k; i++) if (ds[i] in wd) print "      " $1 " owns domain " ds[i]
            k = split($5, ps, ","); for (i = 1; i <= k; i++) if (ps[i] in wp) print "      " $1 " owns path " ps[i]
        }' "${REGISTRY}")"
    [[ -z "${REG_CONFLICTS}" ]] || die "${REGISTRY} assigns our resources to another app:\n${REG_CONFLICTS}"
    say "registry: no conflicts ($(grep -cv '^#' "${REGISTRY}") apps registered)"
else
    say "WARNING: ${REGISTRY} not found — a deploy will create it with this app's entry"
fi

# 7. Paths: the docroot is absent or our symlink; the releases dir is ours.
if sudo test -e "${DOCROOT}" || sudo test -L "${DOCROOT}"; then
    sudo test -L "${DOCROOT}" || die "${DOCROOT} exists and is not a symlink managed by this script"
    case "$(readlink "${DOCROOT}")" in
        "${RELEASES_DIR}"/*) ;;
        *) die "${DOCROOT} points outside ${RELEASES_DIR}" ;;
    esac
fi
if sudo test -e "${RELEASES_DIR}" && ! sudo test -f "${RELEASES_MARKER}"; then
    die "${RELEASES_DIR} exists but was not created by this script"
fi
say "paths: ${DOCROOT} and ${RELEASES_DIR} free or ours"

# 8. Certificate.
cert_ok() { sudo test -f "${CERT_DIR}/fullchain.pem" && sudo test -f "${CERT_DIR}/privkey.pem"; }
check_cert() {
    local sans d
    sans="$(sudo openssl x509 -in "${CERT_DIR}/fullchain.pem" -noout -ext subjectAltName 2>/dev/null)"
    for d in ${DOMAINS}; do
        grep -qE "DNS:${d//./\\.}(,|$)" <<< "${sans}" || die "certificate in ${CERT_DIR} does not cover ${d}"
    done
    say "certificate: $(sudo openssl x509 -in "${CERT_DIR}/fullchain.pem" -noout -enddate)"
    sudo openssl x509 -in "${CERT_DIR}/fullchain.pem" -noout -checkend 604800 > /dev/null \
        || say "WARNING: certificate expires within 7 days"
}
if cert_ok; then
    check_cert
elif [[ "${ISSUE_CERT}" == "1" ]]; then
    say "certificate: missing — will be issued (--issue-cert)"
else
    die "no certificate in ${CERT_DIR} — copy it from the old host, or re-run with --issue-cert once DNS points here"
fi

# 9. Neighbours, before.
snapshot() {
    sudo nginx -T 2>/dev/null | awk -v own="${CONF_PATH}" '
        /^# configuration file / { file = $4; sub(/:$/, "", file); next }
        $1 == "server_name" && file != own {
            for (i = 2; i <= NF; i++) { t = $i; sub(/;$/, "", t); if (t != "_" && t !~ /[*~]/) print t }
        }' | sort -u | { grep -vxF -f <(tr ' ' '\n' <<< "${DOMAINS}") || true; } |
    while read -r host; do
        code="$(curl -sk -o /dev/null -m 10 -w '%{http_code}' --resolve "${host}:443:127.0.0.1" "https://${host}/")" || true
        echo "vhost     ${host} ${code:-ERR}"
    done
    ${DOCKER} ps -a --format '{{.Names}} {{.State}} {{.Status}}' | awk '{
        h = "-"
        if (match($0, /\((healthy|unhealthy|health: starting)\)/)) h = substr($0, RSTART + 1, RLENGTH - 2)
        print "container " $1 " " $2 " " h
    }' | sort
}
snapshot > "${REMOTE_TMP}/before.txt"
say "neighbours: $(grep -c '^vhost' "${REMOTE_TMP}/before.txt") vhosts, $(grep -c '^container' "${REMOTE_TMP}/before.txt") containers recorded"

swap_docroot() {
    sudo ln -sfn "$1" "${DOCROOT}.swap.$$"
    sudo mv -Tf "${DOCROOT}.swap.$$" "${DOCROOT}"
}

compare_neighbours() {
    snapshot > "${REMOTE_TMP}/after.txt"
    if diff -u "${REMOTE_TMP}/before.txt" "${REMOTE_TMP}/after.txt" > "${REMOTE_TMP}/neighbours.diff"; then
        say "neighbours: unchanged"
        return 0
    fi
    echo "" >&2
    echo "    !!! NEIGHBOUR STATE CHANGED DURING THIS DEPLOY — check these now:" >&2
    sed 's/^/      /' "${REMOTE_TMP}/neighbours.diff" >&2
    return 3
}

# --- check -------------------------------------------------------------------
if [[ "${MODE}" == "check" ]]; then
    echo ""
    echo ">>> Neighbour snapshot"
    sed 's/^/    /' "${REMOTE_TMP}/before.txt"
    echo ""
    say "CHECK PASSED — nothing was changed"
    exit 0
fi

# --- rollback ----------------------------------------------------------------
if [[ "${MODE}" == "rollback" ]]; then
    echo ""
    echo ">>> Rollback"
    sudo test -L "${DOCROOT}" || die "no current release to roll back from"
    CURRENT="$(readlink "${DOCROOT}")"
    PREVIOUS="$(sudo find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -name '20*' | sort |
        awk -v cur="${CURRENT}" '$0 == cur { print prev; exit } { prev = $0 }')"
    [[ -n "${PREVIOUS}" ]] || die "no release older than ${CURRENT}"
    swap_docroot "${PREVIOUS}"
    say "docroot: ${CURRENT} -> ${PREVIOUS}"
    compare_neighbours
    exit $?
fi

# --- deploy ------------------------------------------------------------------
echo ""
echo ">>> Deploy"

mkdir "${REMOTE_TMP}/stage"
tar xzf "${REMOTE_TMP}/release.tar.gz" -C "${REMOTE_TMP}/stage"
NEW_CONF="${REMOTE_TMP}/stage/deploy/nginx/${NGINX_CONF_NAME}"
[[ -f "${REMOTE_TMP}/stage/dist/index.html" ]] || die "dist/index.html missing from upload"
grep -q "${MARKER}" "${NEW_CONF}" || die "uploaded vhost lacks the '${MARKER}' marker"
FOREIGN="$(awk '$1 == "server_name" { for (i = 2; i <= NF; i++) { t = $i; sub(/;$/, "", t); print t } }' "${NEW_CONF}" |
    sort -u | grep -vxF -f <(tr ' ' '\n' <<< "${DOMAINS}") || true)"
[[ -z "${FOREIGN}" ]] || die "uploaded vhost declares domains that are not ours: ${FOREIGN}"
FOREIGN_ROOT="$(awk '$1 == "root" { t = $2; sub(/;$/, "", t); print t }' "${NEW_CONF}" | grep -vxF "${DOCROOT}" || true)"
[[ -z "${FOREIGN_ROOT}" ]] || die "uploaded vhost serves a root other than ${DOCROOT}: ${FOREIGN_ROOT}"

VHOST_BACKUP=""
if sudo test -f "${CONF_PATH}"; then
    VHOST_BACKUP="${REMOTE_TMP}/vhost.backup"
    sudo cp -a "${CONF_PATH}" "${VHOST_BACKUP}"
fi

restore_vhost() {
    if [[ -n "${VHOST_BACKUP}" ]]; then
        sudo install -m 644 -o root -g root "${VHOST_BACKUP}" "${CONF_PATH}"
    else
        sudo rm -f -- "${CONF_PATH}"
    fi
}

# Certificate, only on request and only for our own lineage.
if ! cert_ok; then
    for d in ${DOMAINS}; do
        resolved="$(getent ahostsv4 "${d}" | awk 'NR == 1 { print $1 }')"
        [[ "${resolved}" == "${SERVER_IP}" ]] \
            || die "${d} resolves to '${resolved:-nothing}', not ${SERVER_IP} — point DNS here before --issue-cert"
    done
    say "issuing certificate for ${DOMAINS}..."
    {
        echo "# ${MARKER}"
        echo "# temporary HTTP-only vhost for the HTTP-01 challenge"
        echo "server {"
        echo "    listen 80;"
        echo "    listen [::]:80;"
        echo "    server_name ${DOMAINS};"
        echo "    location / { return 404; }"
        echo "}"
    } > "${REMOTE_TMP}/vhost.http-only"
    sudo install -m 644 -o root -g root "${REMOTE_TMP}/vhost.http-only" "${CONF_PATH}"
    if ! sudo nginx -t > /dev/null 2>&1; then
        restore_vhost
        die "temporary HTTP-only vhost failed nginx -t; previous state restored"
    fi
    sudo systemctl reload nginx
    CERT_ARGS=()
    for d in ${DOMAINS}; do CERT_ARGS+=(-d "${d}"); done
    if ! sudo "${CERTBOT}" certonly --nginx --cert-name "${PRIMARY}" "${CERT_ARGS[@]}" \
            --non-interactive --agree-tos --email "${CERTBOT_EMAIL}"; then
        die "certbot failed; the temporary HTTP-only vhost is left in place (it only answers 404 for our domains)"
    fi
    cert_ok || die "certbot reported success but ${CERT_DIR} is incomplete"
    check_cert
fi

# Release.
RELEASE="${RELEASES_DIR}/$(date -u +%Y%m%dT%H%M%SZ)"
sudo mkdir -p "${RELEASES_DIR}"
sudo touch "${RELEASES_MARKER}"
sudo cp -a "${REMOTE_TMP}/stage/dist" "${RELEASE}"
sudo chown -R root:root "${RELEASE}"
sudo find "${RELEASE}" -type d -exec chmod 755 {} +
sudo find "${RELEASE}" -type f -exec chmod 644 {} +
PREV_TARGET=""
if sudo test -L "${DOCROOT}"; then PREV_TARGET="$(readlink "${DOCROOT}")"; fi
swap_docroot "${RELEASE}"
say "release: ${RELEASE}"

# Vhost: install, validate, restore on failure, reload only on success.
sudo install -m 644 -o root -g root "${NEW_CONF}" "${CONF_PATH}"
if ! NGINX_OUT="$(sudo nginx -t 2>&1)"; then
    echo "${NGINX_OUT}" >&2
    restore_vhost
    if [[ -n "${PREV_TARGET}" ]]; then swap_docroot "${PREV_TARGET}"; fi
    sudo nginx -t > /dev/null 2>&1 || echo "    !!! nginx -t still fails after restoring — investigate NOW" >&2
    die "new vhost failed nginx -t; previous vhost and release restored, nginx NOT reloaded"
fi
sudo systemctl reload nginx
say "vhost: ${CONF_PATH} installed, nginx reloaded"

# Our own smoke test.
for d in ${DOMAINS}; do
    code="$(curl -sk -o /dev/null -m 10 -w '%{http_code}' --resolve "${d}:443:127.0.0.1" "https://${d}/")" || true
    say "https://${d}/ -> ${code:-ERR}"
done

# Prune old releases (never the current one, never outside RELEASES_DIR).
CURRENT="$(readlink "${DOCROOT}")"
sudo find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -name '20*' | sort | head -n "-${KEEP_RELEASES}" |
while read -r old; do
    [[ "${old}" == "${CURRENT}" ]] || sudo rm -rf -- "${old}"
done

# Registry entry.
{
    if sudo test -f "${REGISTRY}"; then
        awk -v me="${APP_ID}" '$1 != me' "${REGISTRY}"
    else
        echo "# /etc/deploy-registry — who owns what on this host. One app per line."
        echo "# Deploy scripts must refuse to touch a domain, port, path or compose project owned by another app."
        echo "# app kind port compose_project paths(comma) domains(comma) source updated"
    fi
    echo "${APP_ID} static - - ${OWN_PATHS} ${DOMAINS// /,} ${SOURCE} $(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "${REMOTE_TMP}/registry"
sudo install -m 644 -o root -g root "${REMOTE_TMP}/registry" "${REGISTRY}"
say "registry: ${APP_ID} entry updated"

compare_neighbours
REMOTE
STATUS=$?
set -e

echo ""
case "${STATUS}" in
    0) echo "  Done (${MODE})." ;;
    3) echo "  ${MODE} finished, but a neighbour changed state — see above. Rollback: $0 --rollback" ;;
    *) echo "  FAILED (${MODE}, exit ${STATUS})." ;;
esac
exit "${STATUS}"
