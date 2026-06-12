const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const users = await prisma.user.findMany();
  console.log("Users:", users);
  const links = await prisma.link.findMany({ include: { steps: true } });
  console.log("Links:", links);
}
run();
