import nodemailer, { type Transporter } from 'nodemailer';

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
  notifyTo: string;
}

let cachedTransport: Transporter | null = null;

function readEnv(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();
  const fromEmail = process.env.SMTP_FROM_EMAIL?.trim();
  const fromName = process.env.SMTP_FROM_NAME?.trim() ?? 'Executive Founders';
  const notifyTo = process.env.CONTACT_NOTIFY_TO?.trim() ?? fromEmail;

  if (!host || !portRaw || !user || !password || !fromEmail || !notifyTo) {
    return null;
  }

  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port)) return null;

  return { host, port, user, password, fromEmail, fromName, notifyTo };
}

function getTransport(cfg: SmtpConfig): Transporter {
  if (cachedTransport) return cachedTransport;
  cachedTransport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465, // STARTTLS on 587, implicit TLS on 465
    requireTLS: cfg.port === 587,
    auth: { user: cfg.user, pass: cfg.password },
  });
  return cachedTransport;
}

export interface ContactNotificationInput {
  name: string;
  email: string;
  organisation?: string | null;
  topic?: string | null;
  message: string;
}

export interface SendResult {
  delivered: boolean;
  reason?: 'smtp-not-configured' | 'smtp-error';
  messageId?: string;
}

/**
 * Send a notification email for a new contact-form submission.
 * - Authenticates with the real Workspace mailbox (SMTP_USER / SMTP_PASSWORD).
 * - Uses the alias as the visible From and as the Reply-To target.
 * - The submitter's email is placed in Reply-To so a reply goes back to them.
 * Returns delivered=false instead of throwing when SMTP is unconfigured.
 */
export async function sendContactNotification(input: ContactNotificationInput): Promise<SendResult> {
  const cfg = readEnv();
  if (!cfg) {
    console.log(
      '[contact] SMTP not configured — skipping email delivery.',
      `from=${input.email}`,
      `topic=${input.topic ?? '—'}`,
    );
    return { delivered: false, reason: 'smtp-not-configured' };
  }

  const subject = input.topic
    ? `[Contact] ${input.topic} — ${input.name}`
    : `[Contact] ${input.name}`;

  const text = [
    `New message from the executivefounders.com contact form.`,
    ``,
    `Name:         ${input.name}`,
    `Email:        ${input.email}`,
    `Organisation: ${input.organisation || '—'}`,
    `Topic:        ${input.topic || '—'}`,
    ``,
    `Message:`,
    input.message,
    ``,
    `— Reply directly to this email to respond to ${input.name}.`,
  ].join('\n');

  try {
    const info = await getTransport(cfg).sendMail({
      from: { address: cfg.fromEmail, name: cfg.fromName },
      to: cfg.notifyTo,
      replyTo: { address: input.email, name: input.name },
      subject,
      text,
    });
    return { delivered: true, messageId: info.messageId };
  } catch (err) {
    console.error('[contact] SMTP delivery failed', err);
    return { delivered: false, reason: 'smtp-error' };
  }
}
