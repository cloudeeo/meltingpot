import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL ?? import.meta.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

declare global {
  // eslint-disable-next-line no-var
  var __ef_prisma: PrismaClient | undefined;
}

function createClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter, log: ['warn', 'error'] });
}

export const prisma: PrismaClient = globalThis.__ef_prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__ef_prisma = prisma;
}
