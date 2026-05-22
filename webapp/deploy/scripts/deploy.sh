#!/usr/bin/env bash
set -euo pipefail

#
# Deploy executivefounders.com to AWS Lightsail
#
# Builds the Docker image LOCALLY, transfers it to the server, loads it,
# starts the stack with docker compose, then pushes the Prisma schema
# via an SSH tunnel.
#
# Coexists with the manif app on the same Lightsail instance:
#   - manif      : app port 3000, postgres 5432, network manif_internal
#   - this app   : app port 3001, postgres 5433, network executivefounders_internal
#
# Usage: ./deploy.sh [--fresh]
#

SERVER_IP="63.181.76.197"
SSH_KEY="$HOME/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem"
FRESH="${1:-}"
SSH_USER="ec2-user"
APP_NAME="executivefounders"
APP_DIR="/home/${SSH_USER}/${APP_NAME}"
DEPLOY_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$(cd "${DEPLOY_DIR}/.." && pwd)"
DOMAIN="executivefounders.com"
IMAGE_NAME="${APP_NAME}-app"
LOCAL_TUNNEL_PORT="15433"

SSH_CMD="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP}"
SCP_CMD="scp -i ${SSH_KEY} -o StrictHostKeyChecking=no"

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

echo ""
echo "============================================"
echo "  Deploying ${APP_NAME}"
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
    deploy/nginx/executivefounders.conf \
    deploy/cron/backup-db.sh \
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
rm -f "/tmp/${APP_NAME}-image.tar.gz" "/tmp/${APP_NAME}-config.tar.gz"
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

cd "${APP_DIR}/deploy"

# Stop existing containers for this app only.
sudo docker compose -f docker-compose.prod.yml --env-file .env.production down 2>/dev/null || true

# Load the freshly-uploaded image.
echo "    Loading Docker image..."
sudo docker load < /tmp/${APP_NAME}-image.tar.gz
rm -f /tmp/${APP_NAME}-image.tar.gz
sudo docker image prune -f 2>/dev/null || true

echo "    Starting containers..."
sudo docker compose -f docker-compose.prod.yml --env-file .env.production up -d --force-recreate

# Wait for Postgres.
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

# Wait for app healthcheck.
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

# nginx + SSL
echo "    Configuring nginx..."

CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

if [ ! -f "${CERT_PATH}" ]; then
    echo "    No SSL certificate yet — obtaining one for ${DOMAIN}..."

    # Stage a temporary HTTP-only vhost so certbot's HTTP-01 challenge has
    # an nginx server block matching the hostname.
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
        sudo nginx -t
        exit 1
    fi
    sudo systemctl reload nginx

    if ! sudo certbot certonly --nginx \
            -d ${DOMAIN} -d www.${DOMAIN} \
            --non-interactive --agree-tos \
            --email info@executivefounders.com; then
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

    # certbot succeeded — confirm the file actually appeared.
    if [ ! -f "${CERT_PATH}" ]; then
        echo "    ERROR: certbot reported success but ${CERT_PATH} is missing."
        exit 1
    fi
fi

# Only install the real HTTPS config once we have a cert on disk. This
# avoids leaving nginx in a broken state if certbot fails on a fresh box.
echo "    Installing nginx vhost for ${DOMAIN}..."
sudo cp ${APP_DIR}/deploy/nginx/executivefounders.conf /etc/nginx/conf.d/${DOMAIN}.conf

if ! sudo nginx -t; then
    echo "    ERROR: production nginx config failed to validate."
    sudo nginx -t
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

# Tear down any previous tunnel on the same local port.
lsof -ti tcp:${LOCAL_TUNNEL_PORT} 2>/dev/null | xargs -r kill 2>/dev/null || true

ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no -f -N \
    -L ${LOCAL_TUNNEL_PORT}:127.0.0.1:5433 "${SSH_USER}@${SERVER_IP}"
sleep 2

# Source DB_PASSWORD from .env.production for the schema push.
DB_PASSWORD=$(grep "^DB_PASSWORD=" "${PROJECT_DIR}/.env.production" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
if [[ -z "${DB_PASSWORD}" ]]; then
    echo "    WARNING: DB_PASSWORD not found in .env.production"
fi

# Build the URL piece-by-piece to keep secrets out of the source file.
DB_SCHEME="postgresql"
DB_USER="executivefounders"
DB_HOST="127.0.0.1"
DB_NAME="executivefounders"
TUNNEL_DB_URL="${DB_SCHEME}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${LOCAL_TUNNEL_PORT}/${DB_NAME}?schema=public"

(
    cd "${PROJECT_DIR}"
    DATABASE_URL="${TUNNEL_DB_URL}" pnpm prisma db push --accept-data-loss
) 2>&1 || echo "    WARNING: schema push failed"

# Close the tunnel.
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
