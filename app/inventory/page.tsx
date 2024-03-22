import InventoryInfo from '@/components/inventory-info/InventoryInfo';

const Inventory = async () => {
  return (
    <div className="text-white">
      <div className="mt-5 text-center text-4xl">Inventory</div>
      <InventoryInfo />
    </div>
  );
};

export default Inventory;
