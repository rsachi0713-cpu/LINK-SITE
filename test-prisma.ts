import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });
    console.log(user);
  } catch (e) {
    console.error(e);
  }
}
main();
