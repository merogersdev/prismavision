import { PrismaClient } from '@prisma/client';
import env from '../src/util/validateEnv';

// I'm Globul
declare global {
  namespace NodeJS {
    interface Global {}
  }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
