import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await getServerSession(authOptions);

  try {
    // Fetch all items from the database (cache this later on but for now just get it working)
    const allItems = await prisma.items.findMany();

    // Get total weight of all items
    const totalWeight = allItems.reduce((acc: number, item: any) => acc + item.item_weight, 0);

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

    try {
      const inventoryIdResult: string[] = await prisma.$queryRaw`
        SELECT inventory.id 
        FROM inventory 
        INNER JOIN users ON users.id = inventory.user_id 
        WHERE users.id = ${data.user.id}::uuid`;

      const inventoryId = inventoryIdResult[0].id;

      const updateInventory = await prisma.$queryRaw`
        INSERT INTO inventory_items (inventory_id, item_id, quantity)
        VALUES (${inventoryId}::uuid, ${selectedItem.id}::uuid, 1)
        ON CONFLICT (inventory_id, item_id)
        DO UPDATE SET quantity = inventory_items.quantity + 1;
      `;
    } catch (error) {
      console.log('randomitem', error.message);
    }

    // If an item is found, return it; otherwise, send a 404 response
    if (selectedItem) {
      return NextResponse.json(selectedItem);
    } else {
      return NextResponse.json({ error: 'No item found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    // Send a 500 response in case of an error
    return NextResponse.json({ error: 'Internal server error' });
  }
}
