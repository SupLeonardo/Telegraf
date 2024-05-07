import { PrismaClient } from '@prisma/client';
import { Photos } from './src/photos';
import { Descriptions } from './src/descriptions';
import { database } from './src/keyboard';

const prisma = new PrismaClient();

async function createDish() {
  for (let i = 0; i < database.length; i++) {
    await prisma.dish.create({
      data: {
        id: i+1,
        name: database[i],
        photo: Photos[i],
        description: Descriptions[i]
      }
    })
  }
}

createDish();