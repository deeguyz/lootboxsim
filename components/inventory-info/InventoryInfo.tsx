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
    <div className="p-10">
      {data ? (
        <div className="grid grid-cols-8 justify-center">
          {data.map((item: InventoryItem, index: number) => {
            return (
              <div className="relative mx-5" key={index}>
                <Image
                  className="relative aspect-[200/200] rounded-lg"
                  width={200}
                  src={item.image_url}
                  height={200}
                  alt={item.item_name}
                />
                <div className="absolute right-0 top-0 bg-black rounded-tr-md rounded-bl-md px-3 py-2">
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