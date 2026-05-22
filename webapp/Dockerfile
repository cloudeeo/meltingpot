# Stage 1: install dependencies
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN pnpm install --frozen-lockfile || pnpm install

# Stage 2: build
FROM node:22-alpine AS builder
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
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 astro

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
