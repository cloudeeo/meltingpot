#!/usr/bin/env bash
set -euo pipefail

#
# Pull approved drafts from the server's /data/drafts-export volume into
# the local repo, so they can be reviewed, committed and deployed.
#
# The volume is mounted on the executivefounders-app container at
# /data/drafts-export. The contents live under the Docker volume
# `executivefounders_drafts_export`, accessible from the host via the
# Docker volume mount point. We use `docker cp` from a temporary helper
# container to avoid depending on the host knowing the volume path.
#
# Usage: ./deploy/scripts/pull-drafts.sh
#   - Lists exported drafts on the server.
#   - For each <locale>/<slug>.mdx (+ optional sibling image),
#     copies into src/content/posts/<locale>/<slug>.mdx etc.
#   - Does NOT git commit or push — review locally first.
#

SERVER_IP="63.181.76.197"
SSH_KEY="$HOME/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem"
SSH_USER="ec2-user"
PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LOCAL_POSTS="${PROJECT_DIR}/src/content/posts"

SSH_CMD="ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP}"

if [[ ! -f "$SSH_KEY" ]]; then
    echo "ERROR: SSH key not found at $SSH_KEY" >&2
    exit 1
fi

echo ">>> Listing exported drafts on the server..."
LIST=$($SSH_CMD '
  sudo docker run --rm -v executivefounders_drafts_export:/data alpine:3.19 \
    sh -c "cd /data && find . -type f \\( -name \"*.mdx\" -o -name \"*.jpg\" -o -name \"*.png\" -o -name \"*.webp\" \\) | sort"
')

if [[ -z "${LIST}" ]]; then
    echo "    No exported drafts on the server."
    exit 0
fi

echo "${LIST}" | sed 's|^./|    |'

echo ""
echo ">>> Copying drafts into ${LOCAL_POSTS}/..."

TMP_DIR=$(mktemp -d)
trap 'rm -rf "${TMP_DIR}"' EXIT

# Tar the volume contents on the server, stream to local, untar.
$SSH_CMD '
  sudo docker run --rm -v executivefounders_drafts_export:/data alpine:3.19 \
    sh -c "cd /data && tar -czf - ."
' > "${TMP_DIR}/drafts.tar.gz"

mkdir -p "${LOCAL_POSTS}/en" "${LOCAL_POSTS}/fr"
tar -xzf "${TMP_DIR}/drafts.tar.gz" -C "${LOCAL_POSTS}"

echo ""
echo "    Drafts pulled. Inspect with:  git status ${LOCAL_POSTS#${PROJECT_DIR}/}"
echo ""
echo "    Next: review the MDX, optionally convert hero images to .webp,"
echo "          commit, and run ./deploy/scripts/deploy.sh"
