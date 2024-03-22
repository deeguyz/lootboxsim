'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import { rarityColor } from '@/utilities/utilities';

interface InventoryItem {
  item_name: string;
  item_id: string;
  quantity: number;
  image_url: string;
  rarity: number;
}

const rarityColor = (rarity: number) => {
  switch (rarity) {
    case 1:
      return 'border-blue-400';
    case 2:
      return 'border-yellow-400';
    case 3:
      return 'border-orange-600';
    case 4:
      return 'border-red-800';
    default:
      return 'border-blue-400';
  }
};

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
        throw myErr;
      }
    };
    getData();
  }, []);
  return (
    <div className="p-10">
      {data ? (
        <div className="flex flex-wrap justify-center gap-14">
          {data.map((item: InventoryItem, index: number) => {
            return (
              <div className="relative mx-5" key={index}>
                <Image
                  className={`aspect-[200/200] rounded-lg border-4 border-solid ${rarityColor(item.rarity)}`}
                  width={200}
                  src={item.image_url}
                  height={200}
                  alt={item.item_name}
                />
                <div className="absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-black px-3 py-2">
                  {item.quantity}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default InventoryInfo;
