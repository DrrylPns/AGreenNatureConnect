'use client'
import { Cart } from '@/lib/types';
import axios from 'axios';;
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { z } from 'zod';
import { useLocalStorage } from '../hooks/useLocalStorage';

function CartPage() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [selectedItems, setSelectedItems ] = useState<Cart[]>([])
  const router = useRouter()
  const { setItem } = useLocalStorage('value')
  

  useEffect(() => {
    fetchCartItems();
  }, []);

  
  const handleCheckout = (value: Cart[]) =>{
    try{
      setItem(value)
      router.push('/cart/checkout')
    } catch (error) {

    }
  }

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/markethub/cart');
      setCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (cartItemId: string) => {
    try {  
      const response = await axios.post(`/api/markethub/cart/deleteCartItem`, {id: cartItemId} );
      // Optionally, you can fetch updated cart items after deletion
      fetchCartItems();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation error
        console.error('Validation Error:', error.errors);
      } else {
        // Handle other errors
      console.error('Error deleting cart item:', error);
      }
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
  
  const calculateSubtotal = (selectedItems: Cart[]) => {
    return selectedItems.reduce((total, item) => total + item.variant.price, 0);
  };
  
  const groupedItems = groupItemsByCommunity();

  const handleGoBack = () => {
    router.back(); 
  };

  const serializedItems = JSON.stringify(selectedItems);
  
  return (
    <div>
      <div className='relative pl-5 w-full'>
        <div className='absolute top-3'>
          <button onClick={handleGoBack} >
            <FaArrowLeft/>
          </button>
        </div>
        <h1 className='font-bold text-[2rem] text-center'>Cart</h1>
      </div>
      
      <div className='px-3 pb-32'>
        {Object.entries(groupedItems).map(([communityName, communityItems]) => (
          <div key={communityName} className='mb-2 pb-2 bg-gray-50 shadow-sm drop-shadow-md'>
            <div className='flex items-center gap-20 border-y border-black py-2 px-10'>
              <h2 id={`selectAll_${communityName}`} className='text-[1rem] font-poppins font-bold'>
                Barangay {communityName}
              </h2>
            </div>
            {communityItems.map((item: Cart) => (
              <div key={item.id} className='flex gap-5 justify-between pb-2 items-center border-b-2 border-b-gray-300 mx-10 md:mx-[25%] mt-5'>
                {/* Add a checkbox for each item */}
                <div>
                  <input
                    type="checkbox"
                    id={`selectItem_${item.id}`}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    // Update the selected items based on the individual checkbox
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const updatedSelectedItems = isChecked
                        ? [...selectedItems, item]
                        : selectedItems.filter(selectedItem => selectedItem.id !== item.id);
                      setSelectedItems(updatedSelectedItems);
                    }}
                    disabled={
                      (item.variant.unitOfMeasurement === 'Kilograms' && item.variant.product.kilograms < item.variant.variant) ||
                      (item.variant.unitOfMeasurement === 'Grams' && item.variant.product.grams < item.variant.variant) ||
                      (item.variant.unitOfMeasurement === 'Pounds' && item.variant.product.pounds < item.variant.variant) ||
                      (item.variant.unitOfMeasurement === 'Packs' && item.variant.product.packs < item.variant.variant) ||
                      (item.variant.unitOfMeasurement === 'Pieces' && item.variant.product.pieces < item.variant.variant)
                    }
                  />
                </div>
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
                <button  
                  onClick={() => deleteCartItem(item.id)}
                  className='bg-red-500 text-white px-3 py-2 rounded'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Display the subtotal based on selected items */}
      <div className='fixed bottom-0 w-full flex'>
        <div className='w-1/2 flex justify-center items-center bg-green py-5 text-[1rem] text-white text-4xl font-semibold fon font-poppins'>
          <h1 className='text-center'>Sub Total:<span className='text-2xl font-bold ml-10'>₱ {calculateSubtotal(selectedItems).toFixed(2)}</span></h1>
        </div>
        <button onClick={() => handleCheckout(selectedItems)} className='w-1/2 bg-yellow-400'>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;