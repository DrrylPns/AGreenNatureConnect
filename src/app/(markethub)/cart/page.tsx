'use client'
import { Cart } from '@/lib/types';
import axios from 'axios';
import { group } from 'console';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function CartPage() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [selectedItems, setSelectedItems ] = useState<Cart[]>([])

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/markethub/cart');
      setCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to group items by community name
  const groupItemsByCommunity = () => {
    const groupedItems: Record<string, Cart[]> = {};

    cartItems.forEach((item: Cart) => {
      const communityName = item.variant.product.community.name;
      if (!groupedItems[communityName]) {
        groupedItems[communityName] = [];
      }
      groupedItems[communityName].push(item);
    });

    return groupedItems;
  };

  const groupedItems = groupItemsByCommunity();

  return (
    <div>
      <h1>Cart</h1>
      <div className='px-3'>
        {Object.entries(groupedItems).map(([communityName, communityItems]) => (
          <div key={communityName}>
            <div className='flex items-center gap-20 border-y border-black py-2 px-10'>
              <input 
                type="checkbox" 
                id="myCheckbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <h2 id='myCheckbox' className='text-[1rem] font-poppins font-bold'>Barangay {communityName} </h2>
            </div>
            {communityItems.map((item: Cart) => (
              <div key={item.id} className='flex gap-5 items-center px-[25%] mt-5'>
                <Image 
                  src={item.variant.product.productImage}
                  alt={item.variant.product.name}
                  height={100}
                  width={100}
                />
                <div>
                  <h3>{item.variant.product.name}</h3>
                  <h3>{item.variant.variant} <span>{item.variant.unitOfMeasurement}</span></h3>
                </div>
                <div className='ml-auto'>
                  <h3>P {item.variant.price}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 w-full flex'>
        <div className='w-1/2 bg-green py-10 pl-20'>Sub Total: P 00.00</div>
        <button className='w-1/2 bg-yellow-400 py-10'>Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;