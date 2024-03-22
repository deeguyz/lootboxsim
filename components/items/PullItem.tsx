'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { rarityColor } from '@/utilities/utilities';
interface Item {
  item_name: string;
  rarity: number;
  item_weight: number;
  image_url: string;
  // Add more properties as needed
}

function PullItem() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const saveToInventory = async () => {
      try {
        const res = await fetch('/api/save-to-inventory', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ data: items }),
        });
        await res.json();
      } catch (error) {
        const myErr = error instanceof Error ? error : new Error();
        throw myErr;
      }
    };
    saveToInventory();
  }, [items]);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/random-item', { method: 'GET' });
      const data = await res.json();
      setItems([data]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleClick10 = async () => {
    try {
      const res = await fetch('/api/random-item-10', { method: 'GET' });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-center gap-14">
        {items.map((item, index) => (
          <div key={index}>
            <Image
              className={`aspect-[200/200] rounded-lg border-4 border-solid ${rarityColor(item.rarity)}`}
              src={item.image_url}
              width={200}
              height={200}
              alt={item.item_name}
            />
            <p className="mt-3 text-center">{item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center space-x-4">
        <button className="w-60 rounded-lg border-solid bg-white p-3 text-black" onClick={handleClick}>
          Pull 1 Item
        </button>
        <button className="w-60 rounded-lg border-solid bg-white p-3 text-black" onClick={handleClick10}>
          Pull 10 Items
        </button>
      </div>
    </div>
  );
}

export default PullItem;
