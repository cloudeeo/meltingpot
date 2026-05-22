# Executive Founders — webapp

Astro 5 (Node SSR) + Postgres web application for **executivefounders.com**.
Lightweight, SEO-optimised, self-contained. Same Docker + nginx + deploy.sh
deployment pattern as the `manif` sibling app on the shared Lightsail box.

## Stack

- Astro 5 with the Node standalone adapter
- Tailwind 4 (Vite plugin) + a small component CSS layer
- Postgres 16 via Prisma 7 (`@prisma/adapter-pg`)
- Content lives in **MDX content collections** under `src/content/`:
  - `posts/` — blog / news entries
  - `case-studies/` — portfolio engagements
  - `videos/` — Digital Media entries (YouTube/Vimeo links)
- Postgres stores **contact form submissions** (and is wired for future
  newsletter subscribers, admin users).

## Local development

```bash
cd webapp
pnpm install
# create .env from the template below
docker compose up -d postgres
pnpm prisma generate
pnpm prisma db push
pnpm dev
```

Open <http://localhost:3000>.

### Environment template

Create `.env` (development) and `.env.production` (deploy) with the
keys below. **Never commit these files** — `.gitignore` already excludes
them. Replace every `xxxxxxxx` with a real value.

```text
# App
NODE_ENV=production
PUBLIC_SITE_URL=https://executivefounders.com

# Database — deploy.sh assembles the tunnel URL from DB_PASSWORD,
# and docker-compose.prod.yml reads DATABASE_URL directly.
DB_PASSWORD=xxxxxxxx

# Build the DATABASE_URL using these parts:
#   scheme : postgresql
#   user   : executivefounders
#   pass   : same as DB_PASSWORD above
#   host   : 'localhost' in local dev (port 5433) / 'postgres' in production (port 5432)
#   dbname : executivefounders
#   query  : ?schema=public
DATABASE_URL=xxxxxxxx

# Admin / auth (reserved for future admin UI)
JWT_SECRET=xxxxxxxx

# SMTP (optional — contact form logs to stdout if unset)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=info@executivefounders.com
SMTP_FROM_NAME=Executive Founders
CONTACT_NOTIFY_TO=info@executivefounders.com

# Optional spam protection
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## Production deployment

Coexists with the `manif` app on the same Lightsail instance. Port
allocation:

| App                | App port (host) | Postgres port (host) | Docker network                  |
|--------------------|-----------------|----------------------|---------------------------------|
| manif              | 3000            | 5432                 | `manif_internal`                |
| executivefounders  | 3001            | 5433                 | `executivefounders_internal`    |

### Deploy

```bash
cd webapp
./deploy/scripts/deploy.sh           # incremental
./deploy/scripts/deploy.sh --fresh   # rebuild image with --no-cache
```

The script:

1. Builds the Docker image locally (avoids OOM on the small Lightsail box).
2. Saves + gzips the image, packages the deploy configs.
3. SCPs everything + `.env.production` to the server.
4. SSHs in, loads the image, runs `docker compose up`, waits for health.
5. Installs nginx + obtains a Let's Encrypt cert on first run (for
   `executivefounders.com` and `www.executivefounders.com`).
6. Opens an SSH tunnel to `127.0.0.1:5433` and pushes the Prisma schema.

### First-time DNS

Before the first deploy, point `executivefounders.com` and
`www.executivefounders.com` at the Lightsail static IP
(`63.181.76.197`). Without correct DNS, certbot will fail and the deploy
script will warn but continue.

### Logs and status

```bash
ssh -i ~/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem ec2-user@63.181.76.197

cd ~/executivefounders/deploy
sudo docker compose -f docker-compose.prod.yml --env-file .env.production logs -f app
sudo docker compose -f docker-compose.prod.yml --env-file .env.production ps
```

## Editing content

| Type        | Location                          | Format |
|-------------|-----------------------------------|--------|
| Blog posts  | `src/content/posts/*.mdx`         | MDX with frontmatter |
| Case studies| `src/content/case-studies/*.mdx`  | MDX with frontmatter |
| Videos      | `src/content/videos/*.mdx`        | MDX, `url` is the YouTube/Vimeo link |

Frontmatter schemas live in `src/content.config.ts` (Zod-validated at
build time). Set `draft: true` to hide an entry. Push to git → run
deploy → site updates.

## Routes

| Path                      | Source                              | Notes                       |
|---------------------------|-------------------------------------|-----------------------------|
| `/`                       | `src/pages/index.astro`             | Brochure narrative          |
| `/services`               | `src/pages/services.astro`          |                             |
| `/portfolio`              | `src/pages/portfolio.astro`         | Lists case studies          |
| `/portfolio/[slug]`       | `src/pages/portfolio/[slug].astro`  | Individual case study       |
| `/digital-media`          | `src/pages/digital-media.astro`     | Video grid                  |
| `/news`                   | `src/pages/news/index.astro`        | Blog index                  |
| `/news/[slug]`            | `src/pages/news/[slug].astro`       | Individual post             |
| `/about`                  | `src/pages/about.astro`             |                             |
| `/contact`                | `src/pages/contact.astro`           | POSTs to `/api/contact`     |
| `/api/contact`            | `src/pages/api/contact.ts`          | Persists to Postgres        |
| `/api/health`             | `src/pages/api/health.ts`           | Liveness + DB ping          |
| `/sitemap-index.xml`      | `@astrojs/sitemap` integration      |                             |
| `/rss.xml`                | `src/pages/rss.xml.ts`              | News RSS feed               |
| `/robots.txt`             | `src/pages/robots.txt.ts`           |                             |

## SEO

- Native `<title>`, meta description, canonical, Open Graph and Twitter
  cards on every page.
- JSON-LD `Organization` + `WebSite` on every page; `Article` on news
  posts.
- Static-first (Astro `prerender = true` on all marketing pages and
  content pages). The Node server only handles `/api/*`.
- Sitemap + RSS auto-generated at build time.

## Why not pure static?

The Node adapter is here for two reasons:
1. Contact form needs a server-side endpoint to store submissions and
   (eventually) notify by email.
2. Future admin UI for editing content from the browser, when needed.

Marketing pages are still statically rendered at build time, so request
cost is effectively that of a static site.

## TODO (intentionally deferred)

- Admin UI at `/admin` for editing content (CRUD on posts /
  case-studies / videos backed by Postgres).
- Nodemailer wiring on `/api/contact` (currently the submission is
  persisted and logged; SMTP delivery is a no-op until credentials are
  supplied).
- Cloudflare Turnstile on the contact form.
- Hero / case-study cover images (the schema accepts them; just drop
  files alongside the MDX and reference them in frontmatter).
