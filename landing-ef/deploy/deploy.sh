#!/usr/bin/env bash
set -euo pipefail

#
# Deploy the static Executive Founders landing page to AWS Lightsail.
#
# Builds locally (Astro static output), SCPs the dist/ tarball + nginx
# config to the server, installs them, and reloads nginx. Re-uses the
# Let's Encrypt certificate already issued for executivefounders.com.
#
# This REPLACES the previous nginx vhost on the same host (which used
# to proxy executivefounders.com -> the full Astro/Node app on :3001).
# The full app keeps running but is no longer reachable from this
# domain — point it at a different hostname via webapp/deploy/scripts/
# deploy-tbd.sh when you're ready.
#
# Usage: ./deploy.sh
#

SERVER_IP="63.181.76.197"
SSH_KEY="$HOME/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem"
SSH_USER="ec2-user"
DOMAIN="executivefounders.com"
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "${DEPLOY_DIR}/.." && pwd)"
REMOTE_ROOT="/var/www/ef-landing"
NGINX_CONF_NAME="${DOMAIN}.conf"

SSH_CMD="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP}"
SCP_CMD="scp -i ${SSH_KEY} -o StrictHostKeyChecking=no"

# --- Prerequisites --------------------------------------------------------
if [[ ! -f "$SSH_KEY" ]]; then
    echo "ERROR: SSH key not found at $SSH_KEY"
    exit 1
fi

if ! command -v pnpm > /dev/null 2>&1; then
    echo "ERROR: pnpm is required for the local build."
    exit 1
fi

echo ""
echo "============================================"
echo "  Deploying Executive Founders landing"
echo "  Server: ${SERVER_IP}"
echo "  URL:    https://${DOMAIN}"
echo "============================================"

# --- Step 1: build static site locally -----------------------------------
echo ""
echo ">>> Building static site locally..."
cd "${PROJECT_DIR}"
pnpm install --silent
pnpm build

if [[ ! -d "${PROJECT_DIR}/dist" ]]; then
    echo "ERROR: dist/ not produced by build."
    exit 1
fi

# --- Step 2: package dist + nginx config ---------------------------------
echo ""
echo ">>> Packaging dist + nginx config..."
TARBALL="/tmp/ef-landing.tar.gz"
tar czf "${TARBALL}" -C "${PROJECT_DIR}" dist deploy/nginx/${NGINX_CONF_NAME}
SIZE=$(du -sh "${TARBALL}" | cut -f1)
echo "    Package size: ${SIZE}"

# --- Step 3: upload ------------------------------------------------------
echo ""
echo ">>> Uploading to server..."
$SCP_CMD "${TARBALL}" "${SSH_USER}@${SERVER_IP}:/tmp/ef-landing.tar.gz"
rm -f "${TARBALL}"

# --- Step 4: remote install ----------------------------------------------
echo ""
echo ">>> Installing on server..."
$SSH_CMD DOMAIN="${DOMAIN}" REMOTE_ROOT="${REMOTE_ROOT}" NGINX_CONF_NAME="${NGINX_CONF_NAME}" bash -s <<'REMOTE'
set -euo pipefail

if ! command -v nginx > /dev/null 2>&1; then
    echo "    Installing nginx..."
    sudo yum install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
fi

# Stage extracted files in a tmp dir, then atomically swap the docroot
# so the previous version is still served until the move completes.
STAGE_DIR="/tmp/ef-landing-stage.$$"
mkdir -p "${STAGE_DIR}"
tar xzf /tmp/ef-landing.tar.gz -C "${STAGE_DIR}"
rm -f /tmp/ef-landing.tar.gz

if [[ ! -f "${STAGE_DIR}/dist/index.html" ]]; then
    echo "    ERROR: dist/index.html missing from upload."
    exit 1
fi

sudo mkdir -p "$(dirname "${REMOTE_ROOT}")"
if [[ -d "${REMOTE_ROOT}" ]]; then
    sudo rm -rf "${REMOTE_ROOT}.previous"
    sudo mv "${REMOTE_ROOT}" "${REMOTE_ROOT}.previous"
fi
sudo mv "${STAGE_DIR}/dist" "${REMOTE_ROOT}"
sudo chown -R nginx:nginx "${REMOTE_ROOT}" 2>/dev/null || true
sudo find "${REMOTE_ROOT}" -type d -exec chmod 755 {} \;
sudo find "${REMOTE_ROOT}" -type f -exec chmod 644 {} \;

CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

# /etc/letsencrypt/ is root-only on Amazon Linux, so we cannot use a
# plain `[[ -f ... ]]` here as ec2-user — it would silently return
# "missing" even when the cert exists. All cert-existence probes below
# go through `sudo test -f`.
cert_exists() { sudo test -f "${CERT_PATH}"; }

# Cert-recovery. Symptom on a re-deploy onto a host that already issued
# a cert: certbot's renewal DB still tracks the lineage (so
# `certonly` says "not yet due for renewal") but the standard live/
# symlink chain is missing or points at a different lineage name
# (e.g. ${DOMAIN}-0001). Ask certbot directly where the cert is and
# either alias it back or clean a broken lineage so a fresh issuance
# can succeed.
if ! cert_exists; then
    CERT_INFO=$(sudo certbot certificates 2>&1 || true)

    if echo "${CERT_INFO}" | grep -q "${DOMAIN}"; then
        echo "    Existing cert detected by certbot:"
        echo "${CERT_INFO}" | sed 's/^/      /'
    fi

    CERT_NAME=$(echo "${CERT_INFO}" | awk -v target="${DOMAIN}" '
        /Certificate Name:/ { name = $3; matched = 0; next }
        /Domains:/ {
            for (i = 2; i <= NF; i++) if ($i == target) matched = 1
            if (matched) { print name; exit }
        }
    ')
    ACTUAL_CERT=$(echo "${CERT_INFO}" | awk -v target="${DOMAIN}" '
        /Certificate Name:/ { matched = 0; next }
        /Domains:/ {
            for (i = 2; i <= NF; i++) if ($i == target) matched = 1
        }
        /Certificate Path:/ && matched { print $NF; exit }
    ')

    if [[ -n "${ACTUAL_CERT}" ]] && sudo test -f "${ACTUAL_CERT}"; then
        ACTUAL_DIR=$(dirname "${ACTUAL_CERT}")
        if [[ "${ACTUAL_DIR}" != "/etc/letsencrypt/live/${DOMAIN}" ]]; then
            echo "    Cert is at ${ACTUAL_DIR} — aliasing to /etc/letsencrypt/live/${DOMAIN}"
            sudo rm -rf "/etc/letsencrypt/live/${DOMAIN}"
            sudo ln -s "$(basename "${ACTUAL_DIR}")" "/etc/letsencrypt/live/${DOMAIN}"
        fi
    elif [[ -n "${CERT_NAME}" ]]; then
        echo "    Certbot tracks cert lineage '${CERT_NAME}' but the cert files are missing."
        echo "    Deleting the broken lineage so a fresh certificate can be issued."
        sudo certbot delete --cert-name "${CERT_NAME}" --non-interactive 2>&1 | sed 's/^/      /' || true
    fi
fi

if ! cert_exists; then
    echo "    No TLS certificate yet — obtaining one for ${DOMAIN}..."

    # Ensure certbot is available (Amazon Linux has no system package, so
    # we install into an isolated venv exactly like the webapp deploy).
    if ! command -v certbot > /dev/null 2>&1; then
        echo "    Installing certbot..."
        sudo yum install -y augeas-libs python3
        sudo python3 -m venv /opt/certbot
        sudo /opt/certbot/bin/pip install --quiet certbot certbot-nginx
        sudo ln -sf /opt/certbot/bin/certbot /usr/bin/certbot
    fi

    # Stage a temporary HTTP-only vhost so certbot's HTTP-01 challenge
    # has an nginx server block matching the hostname.
    sudo tee "/etc/nginx/conf.d/${NGINX_CONF_NAME}" > /dev/null <<TMPNGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    location / { return 200 "ok"; add_header Content-Type text/plain; }
}
TMPNGINX

    if ! sudo nginx -t; then
        echo "    ERROR: temporary nginx config failed to validate."
        exit 1
    fi
    sudo systemctl reload nginx

    if ! sudo certbot certonly --nginx \
            -d "${DOMAIN}" -d "www.${DOMAIN}" \
            --non-interactive --agree-tos \
            --email "info@${DOMAIN}"; then
        echo ""
        echo "    ERROR: certbot failed to issue a certificate for ${DOMAIN}."
        echo "    Common causes:"
        echo "      - DNS for ${DOMAIN} / www.${DOMAIN} not pointing at this host"
        echo "      - Port 80 blocked by the Lightsail firewall"
        echo "      - Let's Encrypt rate limit hit (5 failures/hour/domain)"
        echo ""
        echo "    The temporary HTTP-only vhost has been left in place so you can"
        echo "    investigate. Re-run this script after fixing the cause."
        exit 1
    fi

    if ! cert_exists; then
        echo "    ERROR: certbot reported success but ${CERT_PATH} is missing."
        exit 1
    fi
fi

echo "    Installing nginx vhost..."
sudo cp "${STAGE_DIR}/deploy/nginx/${NGINX_CONF_NAME}" "/etc/nginx/conf.d/${NGINX_CONF_NAME}"
rm -rf "${STAGE_DIR}"

if ! sudo nginx -t; then
    echo "    ERROR: nginx config failed to validate. Rolling back vhost is up to you."
    exit 1
fi

sudo systemctl reload nginx

echo "    Deploy complete!"
REMOTE

echo ""
echo "============================================"
echo "  Landing deployed!"
echo "  URL: https://${DOMAIN}"
echo ""
echo "  Note: the previous webapp Docker stack (port 3001) is still"
echo "  running on the server but is no longer reachable from this"
echo "  domain. To stop it explicitly:"
echo "    ${SSH_CMD} 'cd /home/${SSH_USER}/executivefounders/deploy && \\"
echo "      sudo docker compose -f docker-compose.prod.yml --env-file .env.production down'"
echo "============================================"
