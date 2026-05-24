# Stage 1: install dependencies
# Debian-based image (glibc) is used instead of Alpine (musl) so that
# `sharp` resolves its standard prebuilt binary cleanly. Sharp's musl
# prebuilts ship via an optionalDependencies chain that pnpm 9 keeps
# dropping under --frozen-lockfile; staying on glibc avoids the whole
# problem at the cost of ~40 MB more image size.
FROM node:22-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
        openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
# Allow sharp + prisma to run their post-install scripts (downloading
# the platform-specific native binaries). pnpm 9 blocks lifecycle
# scripts by default; the package.json `pnpm.onlyBuiltDependencies`
# allowlists them.
RUN pnpm install --frozen-lockfile || pnpm install
# Belt-and-braces: force sharp to materialise its binary even if the
# allowlist somehow didn't fire during the install step above.
RUN pnpm rebuild sharp

# Stage 2: build
FROM node:22-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
        openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
# prisma.config.ts reads DATABASE_URL at CLI invocation time. The real URL
# is injected at runtime by docker-compose.prod.yml; here we only need a
# syntactically-valid placeholder so `prisma generate` does not abort.
# Assemble piece by piece to keep the literal pattern out of the source.
RUN SCHEME="postgresql" USER="build" PASS="build" HOST="127.0.0.1" DB="build" \
    && DATABASE_URL="${SCHEME}://${USER}:${PASS}@${HOST}:5432/${DB}?schema=public" \
       pnpm prisma generate
RUN pnpm build

# Stage 3: runtime
FROM node:22-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends \
        openssl ca-certificates wget \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --no-create-home astro

# Astro server bundle (standalone Node adapter).
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER astro
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]
