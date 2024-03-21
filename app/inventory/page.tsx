import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import InventoryInfo from '@/components/inventoryinfo/InventoryInfo';
const Inventory = async () => {
  const data = await getServerSession(authOptions);
  return (
    <div className="text-white">
      <div>Inventory for {data.user.name}</div>
      <InventoryInfo />
    </div>
  );
};

export default Inventory;
