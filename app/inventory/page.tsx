import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import InventoryInfo from '@/components/inventory-info/InventoryInfo';

const Inventory = async () => {
  const data = await getServerSession(authOptions);
  return (
    <div className="text-white">
      <div className="my-5 text-center text-4xl">Inventory</div>
      <InventoryInfo />
    </div>
  );
};

export default Inventory;
