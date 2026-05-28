import { PrismaClient } from '@prisma/client'

import { PrismaPg } from '@prisma/adapter-pg-worker'
import { Pool } from '@prisma/pg-worker'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Instantiate the pg pool and Prisma adapter with settings optimized for Cloudflare Workers & PgBouncer
const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 500, // Close idle connections after 500ms to prevent stale connection hangs
  connectionTimeoutMillis: 2000, // Fail fast if connection takes more than 2s
})
const adapter = new PrismaPg(pool as any)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
