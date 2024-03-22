import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const data = await getServerSession(authOptions);
  try {
    // Fetch all items from the database (cache this later on but for now just get it working)
    const allItems = await prisma.items.findMany();

    const selectedItems: any[] = [];
    // Get total weight of all items
    const totalWeight = allItems.reduce((acc: number, item: any) => acc + item.item_weight, 0);

    await prisma.$queryRaw`
      SELECT inventory.id 
      FROM inventory 
      INNER JOIN users ON users.id = inventory.user_id 
      WHERE users.id = ${data.user.id}::uuid
    `;

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.random() * totalWeight;

      let cumulativeWeight = 0;
      let selectedItem = null;

      // Finds an item based off of a random number
      for (const item of allItems) {
        cumulativeWeight += item?.item_weight ?? 0;
        if (randomNumber <= cumulativeWeight) {
          selectedItem = item;
          break;
        }
      }

      if (selectedItem) {
        selectedItems.push(selectedItem);
      }
    }
    // If an item is found, return it; otherwise, send a 404 response
    if (selectedItems) {
      return NextResponse.json(selectedItems);
    } else {
      return NextResponse.json({ error: 'No item found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    // Send a 500 response in case of an error
    return NextResponse.json({ error: 'Internal server error' });
  }
}
