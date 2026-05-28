const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.user.count();
    console.log('Database connected! User count:', count);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
