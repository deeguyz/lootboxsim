import { type NextRequest, NextResponse } from 'next/server';

import prisma from '../../../lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Fetch all items from the database (cache this later on but for now just get it working)
    const allItems = await prisma.items.findMany();

    let selectedItems: any[] = [];

    // Get total weight of all items
    const totalWeight = allItems.reduce((acc: number, item: any) => acc + item.item_weight, 0);

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
