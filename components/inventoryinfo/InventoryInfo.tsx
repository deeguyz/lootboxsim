'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface InventoryItem {
  item_name: string;
  item_id: string;
  quantity: number;
  image_url: string;
}

const InventoryInfo = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch('/api/inventory', { method: 'GET' });
        const response = await result.json();
        setData(response);
      } catch (error) {
        const myErr = error instanceof Error ? error : new Error();
        console.log(myErr);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div>Inventory</div>
      {data ? (
        <div>
          {data.map((item: InventoryItem, index: number) => {
            return (
              <div key={index}>
                {item.item_id}: {item.quantity}
                <Image src={item.image_url} width={200} height={200} alt={item.item_name} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default InventoryInfo;
