import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const data = await getServerSession(authOptions);

  try {
    // Fetch all items from the database (cache this later on but for now just get it working)
    const result = await prisma.$queryRaw`
        SELECT item_name, item_id, quantity, items.image_url
        FROM inventory_items
        INNER JOIN inventory ON inventory.id = inventory_items.inventory_id
        INNER JOIN users ON users.id = inventory.user_id
        INNER JOIN items ON items.id = inventory_items.item_id
        WHERE users.id = ${data?.user.id}::uuid
    `;
    console.log('sql query', result);
    if (result) {
      return NextResponse.json(result);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    // Send a 500 response in case of an error
    return NextResponse.json({ error: 'Internal server error' });
  }
}
