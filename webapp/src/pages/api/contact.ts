import type { APIRoute } from 'astro';
import { z } from 'zod';
import { prisma } from '~/lib/db';
import { hash } from '~/lib/format';
import { sendContactNotification } from '~/lib/mail';

export const prerender = false;

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.').max(200),
  email: z.string().trim().email('Please enter a valid email address.').max(320),
  organisation: z.string().trim().max(200).optional().or(z.literal('')),
  topic: z.string().trim().max(64).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(5, 'Please give us at least a few words about what you would like to discuss.')
    .max(5000, 'Please keep the message under 5000 characters.'),
});

// The honeypot is checked outside the schema so a browser autofill or
// extension cannot reject a legitimate submission — we drop silently
// only when the field is non-empty.
const HONEYPOT_FIELD = 'company_url';

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

  // Honeypot — drop silently if a bot filled this field. Checked before
  // schema parse so we don't surface a validation error to a bot probe.
  const honeypot =
    payload && typeof payload === 'object' && HONEYPOT_FIELD in payload
      ? String((payload as Record<string, unknown>)[HONEYPOT_FIELD] ?? '')
      : '';
  if (honeypot.trim().length > 0) {
    return json({ ok: true }, 200);
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstFieldError = Object.entries(fieldErrors).find(([, msgs]) => msgs && msgs.length > 0);
    const message = firstFieldError?.[1]?.[0] ?? 'Some required fields are missing or invalid.';
    return json({ error: message, fields: fieldErrors }, 400);
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

    // Fire-and-forget delivery. The submission is already persisted, so
    // an SMTP failure does not fail the request — we can recover from
    // the DB row, and the response stays fast for the user.
    void sendContactNotification({
      name: parsed.data.name,
      email: parsed.data.email,
      organisation: parsed.data.organisation || null,
      topic: parsed.data.topic || null,
      message: parsed.data.message,
    }).catch((err) => console.error('contact notify failed', err));

    return json({ ok: true, id: created.id }, 201);
  } catch (err) {
    console.error('contact submission failed', err);
    return json({ error: 'We could not store your message. Please try again.' }, 500);
  }
};
