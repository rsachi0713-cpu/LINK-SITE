import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

/**
 * Creates a fresh PrismaClient per request.
 * 
 * Cloudflare Workers isolates freeze between requests — reusing a singleton
 * PrismaClient causes stale TCP sockets that hang forever. The fix is to
 * create a new client each time and disconnect after use.
 */
export function createPrismaClient(): PrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,                    // Only 1 connection per request
    idleTimeoutMillis: 0,      // Don't keep idle connections
    connectionTimeoutMillis: 5000,
    ssl: { rejectUnauthorized: false },
  })

  const adapter = new PrismaPg(pool as any)

  return new PrismaClient({
    adapter,
    log: ['error'],
  })
}

/**
 * Run a database operation with an auto-disconnecting Prisma client.
 * Always use this in API routes and auth callbacks.
 * 
 * Usage:
 *   const user = await withPrisma(db => db.user.findUnique({ where: { email } }))
 */
export async function withPrisma<T>(
  fn: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  const client = createPrismaClient()
  try {
    return await fn(client)
  } finally {
    await client.$disconnect()
  }
}
