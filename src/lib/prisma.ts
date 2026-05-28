import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg-worker'
import { Pool } from '@prisma/pg-worker'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use @prisma/pg-worker and @prisma/adapter-pg-worker which are specifically
// designed for Cloudflare Workers (uses Cloudflare's TCP socket API, not Node.js `pg`)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
