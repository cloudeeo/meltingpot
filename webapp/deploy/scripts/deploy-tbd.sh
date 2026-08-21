#!/usr/bin/env bash
set -euo pipefail

#
# Deploy the full Executive Founders webapp (the one that used to live
# at executivefounders.com) to a NEW domain — to be chosen.
#
# This is the same machinery as deploy.sh but every reference to the
# domain comes from $MAIN_DOMAIN instead of being hard-coded. Set it in
# the project's .env.production:
#
#   MAIN_DOMAIN=newdomain.example
#
# Or override on the command line:
#
#   MAIN_DOMAIN=newdomain.example ./deploy-tbd.sh [--fresh]
#
# Before you run this:
#   1. Pick the new domain and set MAIN_DOMAIN.
#   2. Point ${MAIN_DOMAIN} and www.${MAIN_DOMAIN} DNS A-records at
#      the Lightsail IP (63.181.76.197).
#   3. Make sure ports 80/443 are open in the Lightsail firewall.
#   4. The script will issue a fresh Let's Encrypt cert for the new
#      domain on first run.
#

SERVER_IP="63.181.76.197"
SSH_KEY="$HOME/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem"
FRESH="${1:-}"
SSH_USER="ec2-user"
APP_NAME="executivefounders"
APP_DIR="/home/${SSH_USER}/${APP_NAME}"
DEPLOY_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$(cd "${DEPLOY_DIR}/.." && pwd)"
IMAGE_NAME="${APP_NAME}-app"
LOCAL_TUNNEL_PORT="15433"

SSH_CMD="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP}"
SCP_CMD="scp -i ${SSH_KEY} -o StrictHostKeyChecking=no"

# --- Resolve MAIN_DOMAIN --------------------------------------------------
if [[ -z "${MAIN_DOMAIN:-}" && -f "${PROJECT_DIR}/.env.production" ]]; then
    MAIN_DOMAIN=$(grep "^MAIN_DOMAIN=" "${PROJECT_DIR}/.env.production" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
fi
if [[ -z "${MAIN_DOMAIN:-}" ]]; then
    echo "ERROR: MAIN_DOMAIN is not set."
    echo "       Add MAIN_DOMAIN=yourdomain.example to .env.production,"
    echo "       or pass it inline: MAIN_DOMAIN=yourdomain.example ./deploy-tbd.sh"
    exit 1
fi
DOMAIN="${MAIN_DOMAIN}"

# --- Prerequisites --------------------------------------------------------
if [[ ! -f "$SSH_KEY" ]]; then
    echo "ERROR: SSH key not found at $SSH_KEY"
    exit 1
fi

if [[ ! -f "${PROJECT_DIR}/.env.production" ]]; then
    echo "ERROR: .env.production not found in ${PROJECT_DIR}"
    echo "       Copy the template from README.md and fill in the values."
    exit 1
fi

BUILD_FLAG=""
if [[ "$FRESH" == "--fresh" ]]; then
    BUILD_FLAG="--no-cache"
    echo ">>> Fresh build requested (--no-cache)"
fi

# Render the nginx vhost from the canonical executivefounders.conf
# template by sed-substituting the server_name lines. We keep the
# original config readable and just produce a deploy-time variant.
NGINX_TEMPLATE="${DEPLOY_DIR}/nginx/executivefounders.conf"
NGINX_RENDERED="${DEPLOY_DIR}/nginx/${DOMAIN}.conf.rendered"
sed -E \
    -e "s/executivefounders\.com/${DOMAIN}/g" \
    -e "s|/etc/letsencrypt/live/${DOMAIN}/|/etc/letsencrypt/live/${DOMAIN}/|g" \
    "${NGINX_TEMPLATE}" > "${NGINX_RENDERED}"

echo ""
echo "============================================"
echo "  Deploying ${APP_NAME} (TBD-domain build)"
echo "  Server: ${SERVER_IP}"
echo "  URL:    https://${DOMAIN}"
echo "============================================"

# --- Step 1: build image locally -----------------------------------------
echo ""
echo ">>> Building Docker image locally..."
cd "${PROJECT_DIR}"
docker build ${BUILD_FLAG} -t ${IMAGE_NAME}:latest -f Dockerfile .
docker image prune -f 2>/dev/null || true
echo "    Build complete"

# --- Step 2: save image --------------------------------------------------
echo ""
echo ">>> Saving Docker image..."
docker save ${IMAGE_NAME}:latest | gzip > "/tmp/${APP_NAME}-image.tar.gz"
IMAGE_SIZE=$(du -sh "/tmp/${APP_NAME}-image.tar.gz" | cut -f1)
echo "    Image size: ${IMAGE_SIZE}"

# --- Step 3: package deploy configs --------------------------------------
echo ""
echo ">>> Creating config package..."
cd "${PROJECT_DIR}"
tar czf "/tmp/${APP_NAME}-config.tar.gz" \
    deploy/docker-compose.prod.yml \
    deploy/entrypoint.sh \
    "deploy/nginx/${DOMAIN}.conf.rendered" \
    deploy/cron/ \
    prisma/schema.prisma
echo "    Config package created"

# --- Step 4: ensure remote directories -----------------------------------
echo ""
echo ">>> Preparing server..."
$SSH_CMD "mkdir -p ${APP_DIR}/deploy"

# --- Step 5: upload ------------------------------------------------------
echo ""
echo ">>> Uploading to server..."
$SCP_CMD "/tmp/${APP_NAME}-image.tar.gz"  "${SSH_USER}@${SERVER_IP}:/tmp/${APP_NAME}-image.tar.gz"
$SCP_CMD "/tmp/${APP_NAME}-config.tar.gz" "${SSH_USER}@${SERVER_IP}:/tmp/${APP_NAME}-config.tar.gz"
$SCP_CMD "${PROJECT_DIR}/.env.production" "${SSH_USER}@${SERVER_IP}:${APP_DIR}/deploy/.env.production"
rm -f "/tmp/${APP_NAME}-image.tar.gz" "/tmp/${APP_NAME}-config.tar.gz" "${NGINX_RENDERED}"
echo "    Upload complete"

# --- Step 6: remote deploy ------------------------------------------------
echo ""
echo ">>> Deploying on server..."
$SSH_CMD APP_NAME=${APP_NAME} APP_DIR=${APP_DIR} DOMAIN=${DOMAIN} bash -s <<'REMOTE_DEPLOY'
set -euo pipefail

cd "${APP_DIR}"

echo "    Extracting config..."
tar xzf /tmp/${APP_NAME}-config.tar.gz
rm -f /tmp/${APP_NAME}-config.tar.gz

# Ensure Docker is installed.
if ! command -v docker &> /dev/null; then
    echo "    Installing Docker..."
    sudo yum install -y docker
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker "$USER"
fi
sudo systemctl start docker 2>/dev/null || true

# Ensure docker compose plugin is installed.
if ! sudo docker compose version &> /dev/null; then
    echo "    Installing Docker Compose plugin..."
    sudo mkdir -p /usr/local/lib/docker/cli-plugins
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f4)
    sudo curl -fsSL "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
        -o /usr/local/lib/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
fi

# Ensure nginx is installed.
if ! command -v nginx &> /dev/null; then
    echo "    Installing nginx..."
    sudo yum install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
fi

# Ensure certbot is installed.
if ! command -v certbot &> /dev/null; then
    echo "    Installing certbot..."
    sudo yum install -y augeas-libs
    sudo python3 -m venv /opt/certbot
    sudo /opt/certbot/bin/pip install certbot certbot-nginx
    sudo ln -sf /opt/certbot/bin/certbot /usr/bin/certbot
fi

# Ensure certificates actually renew. The pip/venv certbot install ships no
# timer and Amazon Linux 2023 has no cron daemon by default, so without this
# every certificate on the box silently expires after 90 days.
if ! systemctl list-unit-files certbot-renew.timer &> /dev/null || \
   ! systemctl is-enabled certbot-renew.timer &> /dev/null; then
    echo "    Installing certbot auto-renewal timer..."

    sudo mkdir -p /etc/letsencrypt/renewal-hooks/deploy
    sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh > /dev/null <<'HOOK'
#!/bin/sh
# Reload nginx after a renewal so the new chain is served. A failed reload
# must not fail the renewal itself.
/usr/bin/systemctl reload nginx || true
HOOK
    sudo chmod 755 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

    sudo tee /etc/systemd/system/certbot-renew.service > /dev/null <<'UNIT'
[Unit]
Description=Renew Let's Encrypt certificates
After=network-online.target nginx.service
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/bin/certbot renew --quiet --no-random-sleep-on-renew
UNIT

    sudo tee /etc/systemd/system/certbot-renew.timer > /dev/null <<'UNIT'
[Unit]
Description=Run certbot renew twice daily

[Timer]
OnCalendar=*-*-* 03:00:00
OnCalendar=*-*-* 15:00:00
RandomizedDelaySec=3600
Persistent=true

[Install]
WantedBy=timers.target
UNIT

    sudo systemctl daemon-reload
    sudo systemctl enable --now certbot-renew.timer
fi

cd "${APP_DIR}/deploy"

sudo docker compose -f docker-compose.prod.yml --env-file .env.production down 2>/dev/null || true

echo "    Loading Docker image..."
sudo docker load < /tmp/${APP_NAME}-image.tar.gz
rm -f /tmp/${APP_NAME}-image.tar.gz
sudo docker image prune -f 2>/dev/null || true

echo "    Starting containers..."
sudo docker compose -f docker-compose.prod.yml --env-file .env.production up -d --force-recreate

echo "    Waiting for PostgreSQL..."
for i in $(seq 1 60); do
    if sudo docker compose -f docker-compose.prod.yml --env-file .env.production exec -T postgres pg_isready -U executivefounders > /dev/null 2>&1; then
        echo "    PostgreSQL ready"
        break
    fi
    if [ $i -eq 60 ]; then
        echo "    ERROR: PostgreSQL failed to start"
        sudo docker compose -f docker-compose.prod.yml --env-file .env.production logs postgres
        exit 1
    fi
    sleep 1
done

echo "    Waiting for app health check..."
for i in $(seq 1 60); do
    if wget -qO- http://127.0.0.1:3001/api/health > /dev/null 2>&1; then
        echo "    App is healthy!"
        break
    fi
    if [ $i -eq 60 ]; then
        echo "    WARNING: App not healthy after 60s"
        sudo docker compose -f docker-compose.prod.yml --env-file .env.production logs app
    fi
    sleep 1
done

echo "    Configuring nginx for ${DOMAIN}..."

CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

if [ ! -f "${CERT_PATH}" ]; then
    echo "    No SSL certificate yet — obtaining one for ${DOMAIN}..."
    sudo tee /etc/nginx/conf.d/${DOMAIN}.conf > /dev/null <<TMPNGINX
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
            -d ${DOMAIN} -d www.${DOMAIN} \
            --non-interactive --agree-tos \
            --email info@executivefounders.com; then
        echo ""
        echo "    ERROR: certbot failed to issue a certificate for ${DOMAIN}."
        echo "    Check DNS, firewall and rate limits, then re-run."
        exit 1
    fi

    if [ ! -f "${CERT_PATH}" ]; then
        echo "    ERROR: certbot reported success but ${CERT_PATH} is missing."
        exit 1
    fi
else
    # A certificate file exists, but existing != valid. Deploying used to skip
    # this branch entirely, which is how the cert reached its expiry date
    # unnoticed. `certbot renew` is a no-op while more than 30 days remain, so
    # it is safe to run on every deploy.
    if sudo openssl x509 -checkend 0 -noout -in "${CERT_PATH}" > /dev/null 2>&1; then
        echo "    Certificate present and not expired — checking for renewal..."
    else
        echo "    WARNING: certificate for ${DOMAIN} is EXPIRED — renewing now."
    fi

    if ! sudo certbot renew --cert-name ${DOMAIN} --no-random-sleep-on-renew; then
        echo "    WARNING: certbot renew failed for ${DOMAIN}."
        echo "             The existing certificate is left in place; check"
        echo "             /var/log/letsencrypt/letsencrypt.log."
    fi

    if ! sudo openssl x509 -checkend 0 -noout -in "${CERT_PATH}" > /dev/null 2>&1; then
        echo "    ERROR: ${DOMAIN} is still serving an expired certificate."
        exit 1
    fi
fi

echo "    Refreshing admin Basic Auth credentials..."
ADMIN_USER=$(grep "^ADMIN_BASIC_AUTH_USER=" "${APP_DIR}/deploy/.env.production" 2>/dev/null | cut -d'=' -f2- | tr -d '"' | tr -d "'")
ADMIN_PASS=$(grep "^ADMIN_BASIC_AUTH_PASS=" "${APP_DIR}/deploy/.env.production" 2>/dev/null | cut -d'=' -f2- | tr -d '"' | tr -d "'")
if [[ -z "${ADMIN_USER}" || -z "${ADMIN_PASS}" ]]; then
    echo "    WARNING: ADMIN_BASIC_AUTH_USER / ADMIN_BASIC_AUTH_PASS not set; /admin/* will be unreachable until they are."
else
    HASHED=$(openssl passwd -apr1 "${ADMIN_PASS}")
    echo "${ADMIN_USER}:${HASHED}" | sudo tee /etc/nginx/htpasswd-ef-admin > /dev/null
    sudo chmod 640 /etc/nginx/htpasswd-ef-admin
fi

echo "    Installing nginx vhost for ${DOMAIN}..."
sudo cp ${APP_DIR}/deploy/nginx/${DOMAIN}.conf.rendered /etc/nginx/conf.d/${DOMAIN}.conf

if ! sudo nginx -t; then
    echo "    ERROR: production nginx config failed to validate."
    exit 1
fi
sudo systemctl reload nginx

echo ""
echo "    Deploy complete!"
sudo docker compose -f docker-compose.prod.yml --env-file .env.production ps
REMOTE_DEPLOY

# --- Step 7: push DB schema via SSH tunnel -------------------------------
echo ""
echo ">>> Syncing database schema via SSH tunnel..."

lsof -ti tcp:${LOCAL_TUNNEL_PORT} 2>/dev/null | xargs -r kill 2>/dev/null || true

ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no -f -N \
    -L ${LOCAL_TUNNEL_PORT}:127.0.0.1:5433 "${SSH_USER}@${SERVER_IP}"
sleep 2

DB_PASSWORD=$(grep "^DB_PASSWORD=" "${PROJECT_DIR}/.env.production" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
if [[ -z "${DB_PASSWORD}" ]]; then
    echo "    WARNING: DB_PASSWORD not found in .env.production"
fi

DB_SCHEME="postgresql"
DB_USER="executivefounders"
DB_HOST="127.0.0.1"
DB_NAME="executivefounders"
TUNNEL_DB_URL="${DB_SCHEME}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${LOCAL_TUNNEL_PORT}/${DB_NAME}?schema=public"

(
    cd "${PROJECT_DIR}"
    DATABASE_URL="${TUNNEL_DB_URL}" pnpm prisma db push --accept-data-loss
) 2>&1 || echo "    WARNING: schema push failed"

lsof -ti tcp:${LOCAL_TUNNEL_PORT} 2>/dev/null | xargs -r kill 2>/dev/null || true
echo "    Schema sync complete"

echo ""
echo "============================================"
echo "  Deployment successful!"
echo "  App: https://${DOMAIN}"
echo ""
echo "  Useful commands:"
echo "    SSH:    ssh -i ${SSH_KEY} ${SSH_USER}@${SERVER_IP}"
echo "    Logs:   ${SSH_CMD} 'cd ${APP_DIR}/deploy && sudo docker compose -f docker-compose.prod.yml --env-file .env.production logs -f app'"
echo "    Status: ${SSH_CMD} 'cd ${APP_DIR}/deploy && sudo docker compose -f docker-compose.prod.yml --env-file .env.production ps'"
echo "============================================"
