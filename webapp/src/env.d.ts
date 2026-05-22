/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly DATABASE_URL: string;
  readonly JWT_SECRET: string;
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASSWORD?: string;
  readonly SMTP_FROM_EMAIL?: string;
  readonly SMTP_FROM_NAME?: string;
  readonly CONTACT_NOTIFY_TO?: string;
  readonly TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
