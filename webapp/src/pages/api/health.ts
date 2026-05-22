import type { APIRoute } from 'astro';
import { prisma } from '~/lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  const startedAt = Date.now();
  let dbOk = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {
    dbOk = false;
  }
  const body = {
    status: dbOk ? 'ok' : 'degraded',
    db: dbOk,
    uptimeMs: process.uptime() * 1000,
    latencyMs: Date.now() - startedAt,
    version: process.env.APP_VERSION ?? '0.1.0',
  };
  return new Response(JSON.stringify(body), {
    status: dbOk ? 200 : 503,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
