const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
  try {
    const user = await prisma.user.create({ data: { name: 'John Doe', email: 'john@example.com' } });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

createUser();