'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
        const res = await fetch('/api/random-item-10', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ data: items }),
        });
        const data = await res.json();
      } catch (error) {
        console.log('random-item-10', error);
      }
    };
    saveToInventory();
  }, [items]);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/random-item', { method: 'POST' });
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

  const rarityColor = (rarity: number) => {
    switch (rarity) {
      case 1:
        return 'border-blue-400';
      case 2:
        return 'border-yellow-400';
      case 3:
        return 'border-orange-600';
      default:
        return 'border-blue-400';
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
      <div className="flex justify-center space-x-4">
        <button onClick={handleClick}>Pull 1 Item</button>
        <button onClick={handleClick10}>Pull 10 Items</button>
      </div>
    </div>
  );
}

export default PullItem;
