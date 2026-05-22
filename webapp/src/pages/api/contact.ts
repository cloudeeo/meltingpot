import type { APIRoute } from 'astro';
import { z } from 'zod';
import { prisma } from '~/lib/db';
import { hash } from '~/lib/format';

export const prerender = false;

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  organisation: z.string().trim().max(200).optional().or(z.literal('')),
  topic: z.string().trim().max(64).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(5000),
  company_url: z.string().max(0).optional(), // honeypot — must be empty
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: unknown;
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'Some required fields are missing or invalid.' }, 400);
  }

  // Honeypot hit — pretend success, drop silently.
  if (parsed.data.company_url) {
    return json({ ok: true }, 200);
  }

  const ip = clientAddress ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const userAgent = request.headers.get('user-agent') ?? '';

  try {
    const created = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        organisation: parsed.data.organisation || null,
        topic: parsed.data.topic || null,
        message: parsed.data.message,
        ipHash: ip ? hash(ip) : null,
        userAgent: userAgent.slice(0, 500) || null,
      },
      select: { id: true, createdAt: true },
    });

    // Best-effort notification email (logs to stdout in dev).
    void notify(parsed.data).catch((err) => console.error('contact notify failed', err));

    return json({ ok: true, id: created.id }, 201);
  } catch (err) {
    console.error('contact submission failed', err);
    return json({ error: 'We could not store your message. Please try again.' }, 500);
  }
};

async function notify(submission: z.infer<typeof ContactSchema>): Promise<void> {
  const host = import.meta.env.SMTP_HOST;
  const to = import.meta.env.CONTACT_NOTIFY_TO ?? import.meta.env.SMTP_FROM_EMAIL;
  if (!host || !to) {
    console.log('[contact]', submission.email, '—', submission.topic, '—', submission.message.slice(0, 120));
    return;
  }
  // SMTP delivery is intentionally not implemented here — wire nodemailer
  // when SMTP credentials are available. The submission is already persisted.
  console.log('[contact] persisted, SMTP not wired yet — would notify', to);
}
