import { PrismaClient } from '@prisma/client';
import env from '../src/util/env';

declare let global: unknown;

const globalForPrisma = global as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
