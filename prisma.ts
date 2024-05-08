import { PrismaClient } from '@prisma/client';
import { Photos } from './src/photos';
import { Descriptions } from './src/descriptions';
import { database } from './src/keyboard';

const prisma = new PrismaClient();

async function createDish() {
  const dishes = await prisma.dish.findMany({orderBy: {id: "asc"}})
  console.log(dishes[dishes.length - 1])
}

createDish();