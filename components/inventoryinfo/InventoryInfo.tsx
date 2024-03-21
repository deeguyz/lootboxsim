'use client';
import React, { useEffect, useState } from 'react';

const InventoryInfo = () => {
  const [data, setData] = useState(null);
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
          {data.map((item: object, index) => {
            return (
              <div key={index}>
                {item.item_id}: {item.quantity}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default InventoryInfo;
