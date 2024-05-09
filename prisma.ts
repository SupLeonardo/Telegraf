import { PrismaClient } from '@prisma/client';
import { Photos } from './src/photos';
import { Descriptions } from './src/descriptions';

const prisma = new PrismaClient();

async function createDish() {
  const user = await prisma.dish.findUnique({
    where: {
      id: 2,
    },
    select: {
      photo: true,
    },
  });
  
  console.log(user.photo);
}

createDish();

// let matrix:string[][] = [[]];
// matrix[0] = ['hello', '1'];
// matrix.push(['go', '2'])  // Добавляет новый подмассив в конец двумерного массива
// console.log(matrix)