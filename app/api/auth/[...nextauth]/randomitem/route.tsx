import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: any) {
  //fetch all items from database (cache this later on but for now just get it working)
  const allItems = await prisma.items.findMany();

  //Get total weight of all items
  const totalWeight = allItems.reduce((acc: number, item: any) => acc + item.weight, 0);

  const randomNumber = Math.random() * totalWeight;

  let cumulativeWeight = 0;

  //Finds an item based off of a random number
  for (const item of allItems) {
    // ? operator tells typescript that it's optional ?? is default value if item ends up being null
    cumulativeWeight += item?.item_weight ?? 0;
    if (randomNumber <= cumulativeWeight) {
      return item; //Return the selected item based off a random number and weighted distribution
    }
  }

  return null;
}
