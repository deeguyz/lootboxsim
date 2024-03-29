import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '@/utilities/authOptions';

export async function POST(req: NextRequest) {
  const data = await getServerSession(authOptions);
  if (data) {
    const inventoryIdResult: Array<object> = await prisma.$queryRaw`
      SELECT inventory.id 
      FROM inventory 
      INNER JOIN users ON users.id = inventory.user_id 
      WHERE users.id = ${data?.user?.id}::uuid
    `;
    console.log('result', inventoryIdResult);
    const inventoryId = (inventoryIdResult[0] as any).id;

    try {
      const { data } = await req.json();
      const counter = new Map();
      for (let i = 0; i < data.length; i++) {
        counter.set(data[i].id, (counter.get(data[i].id) || 0) + 1);
      }
      counter.forEach(async (quantity, key) => {
        await prisma.$queryRaw`
        INSERT INTO inventory_items (inventory_id, item_id, quantity)
        VALUES (${inventoryId}::uuid, ${key}::uuid, 1)
        ON CONFLICT (inventory_id, item_id)
        DO UPDATE SET quantity = inventory_items.quantity + ${quantity};
      `;
      });
      return NextResponse.json(true);
    } catch (error) {
      const myErr = error instanceof Error ? error : new Error();
      throw myErr;
    }
  } else {
    return NextResponse.json(false);
  }
}
