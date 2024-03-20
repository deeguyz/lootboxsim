'use client';

import React, { useState } from 'react';

interface Item {
  item_name: string;
  rarity: number;
  item_weight: number;
  // Add more properties as needed
}

function PullItem() {
  const [item, setItem] = useState<Item[]>([]);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/randomitem', { method: 'GET' });
      console.log('FETCH SUCCESS');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      console.log(data);
      setItem([data]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleClick10 = async () => {
    try {
      const res = await fetch('/api/randomitem-10', { method: 'GET' });
      console.log('FETCH SUCCESS');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      console.log(data);
      setItem(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div className="text-white">
      <div className="flex justify-center space-x-4">
        <button onClick={handleClick}>Pull 1 Item</button>
        <button onClick={handleClick10}>Pull 10 Items</button>
      </div>

      <div className="flex justify-center space-x-4">
        {item.map((item, index) => (
          <div key={index} className="flex-none">
            <p>Item Name: {item.item_name}</p>
            <p>Rarity: {item.rarity}</p>
            <p>Weight: {item.item_weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PullItem;
