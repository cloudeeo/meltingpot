# Executive Founders — landing

Tiny static Astro project (single page, English only, no analytics) that
serves **https://executivefounders.com**. The full multi-page site
(with insights, services sub-pages, contact form, etc.) lives in
[`../webapp`](../webapp) and is intended to be redeployed to a different
domain via `../webapp/deploy/scripts/deploy-tbd.sh` when one is chosen.

## What's here

```
landing-ef/
├── astro.config.mjs          static-only build, site = executivefounders.com
├── package.json              pnpm; deps = astro only
├── tsconfig.json             extends astro/tsconfigs/strict
├── public/                   favicon, logo, apple-touch-icon (copied from webapp)
├── src/
│   ├── assets/               hero01.webp, hero02.webp (originals restored from git)
│   ├── pages/index.astro     the single landing page
│   └── styles/landing.css    minimal CSS — design tokens mirror webapp
└── deploy/
    ├── deploy.sh             build, scp, swap nginx vhost, reload
    └── nginx/
        └── executivefounders.conf
```

## Local preview

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # → ./dist
pnpm preview      # serve the built dist/ for a smoke test
```

## Deploy

```bash
./deploy/deploy.sh
```

The script:

1. Builds the static site locally (`pnpm build`).
2. Tars `dist/` + the nginx vhost, SCPs to the Lightsail box.
3. Atomically swaps `/var/www/ef-landing` to the new build (previous
   version kept at `/var/www/ef-landing.previous` for a one-step manual
   rollback).
4. Installs `executivefounders.com.conf` into `/etc/nginx/conf.d/`,
   replacing the previous proxy vhost.
5. Reloads nginx.

Re-uses the existing Let's Encrypt certificate at
`/etc/letsencrypt/live/executivefounders.com/`. If it has been removed,
re-issue with:

```bash
sudo certbot certonly --nginx \
    -d executivefounders.com -d www.executivefounders.com
```

## After deploy

The previous full-site Docker stack (port 3001) keeps running on the
server but is no longer reachable from `executivefounders.com`. To stop
it explicitly:

```bash
ssh -i ~/.ssh/LightsailDefaultKey-eu-central-1-ef-01.pem \
    ec2-user@63.181.76.197 \
    'cd /home/ec2-user/executivefounders/deploy && \
     sudo docker compose -f docker-compose.prod.yml --env-file .env.production down'
```

## Editing the landing

- **Copy** — edit `src/pages/index.astro` directly. The three service
  cards are defined inline in the frontmatter; the hero copy is in the
  body. There is no i18n layer.
- **Styling** — `src/styles/landing.css`. Design tokens at the top
  mirror `webapp/src/styles/global.css` so the brand stays consistent.
- **Brand assets** — replacing `public/favicon.svg` /
  `public/apple-touch-icon.png` updates both this landing and (if you
  copy them across) the full webapp.

## Why a separate project

- Independent deploy, no risk of leaking the full site to this domain.
- ~30 KB shipped HTML/CSS + 2 hero images; loads in well under a second.
- No backend, no Postgres, no Node runtime — pure nginx serves it.
- No analytics or cookies → no consent banner needed.
