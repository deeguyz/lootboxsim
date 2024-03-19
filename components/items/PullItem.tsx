'use client';

import React, { useState } from 'react';

interface Item {
  item_name: string;
  rarity: number;
  item_weight: number;
  // Add more properties as needed
}

function PullItem() {
  const [item, setItem] = useState<Item | null>(null);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/randomitem', { method: 'GET' });
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
    <div>
      <button onClick={handleClick}>Pull 1 Item</button>
      {item && (
        <div>
          <p>Item Name: {item.item_name}</p>
          <p>Rarity: {item.rarity}</p>
          <p>Weight: {item.item_weight}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default PullItem;
