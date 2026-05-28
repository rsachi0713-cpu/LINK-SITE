const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      }
    });
    console.log('=== REGISTERED USERS IN DATABASE ===');
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Database query failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
