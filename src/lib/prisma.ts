import { PrismaClient } from '@prisma/client'
import { Pool } from '@prisma/pg-worker'
import { PrismaPg } from '@prisma/adapter-pg-worker'

function createPrismaClient() {
  let connectionString = process.env.DATABASE_URL;

  try {
    const cfContext = (globalThis as any)[Symbol.for("__cloudflare-context__")];
    if (cfContext?.env?.HYPERDRIVE) {
      const hd = cfContext.env.HYPERDRIVE;
      if (hd.connectionString || (hd as any).connectionString) {
        connectionString = hd.connectionString || (hd as any).connectionString;
      }
    }
  } catch (e) {
    // ignore
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
