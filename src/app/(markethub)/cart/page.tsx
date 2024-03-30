'use client'
import { Cart } from '@/lib/types';
import axios from 'axios';;
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { z } from 'zod';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Loading from '../loading';
import { useCart } from '@/contexts/CartContext';
import DeleteCartItemModal from '../components/DeleteCartItemModal';
import { toast } from '@/lib/hooks/use-toast';

function CartPage() {
  const { cartNumber, setCartNumber} = useCart();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [selectedItems, setSelectedItems ] = useState<Cart[]>([])
  const [error, setError] = useState<boolean>(false)
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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (cartItemId: string, productName: string, closeModal:()=>void ) => {
    try {  
      const response = await axios.post(`/api/markethub/cart/deleteCartItem`, {id: cartItemId} );
      // Update the cart items without the deleted item
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));

    // Update the selected items without the deleted item
    setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((item) => item.id !== cartItemId));
      setCartNumber((prevCartNumber) => prevCartNumber - 1);
      toast({
        title: productName,
        description: productName + " deleted successfully!",
        variant: 'default'
      })
      fetchCartItems();
      closeModal()
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
    return selectedItems.reduce((total, item) => {
      const priceToAdd = item.variant.product.isFree ? 0 : item.variant.price;
      return total + priceToAdd;
    }, 0);
  };
  
  const groupedItems = groupItemsByCommunity();

  const handleGoBack = () => {
    router.back(); 
  };

  
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
      <Suspense fallback={<Loading/>}>
      <div className='sm:px-3 pb-32'>
        {cartItems.length < 1 && (
           <div className='w-full flex flex-col gap-5 justify-center h-[50vh] items-center'>
            <h1 className='text-center text-2xl text-gray-400 font-medium font-livvic '>Your cart is currently empty right now!</h1>
            <Link href={'/markethub'} className='px-5 py-2 border-2 rounded-md border-green bg-transparent hover:bg-yellow-400  font-poppins font-medium transition-colors duration-500 ease-in-out mx-auto'>Shop now</Link>
           </div>
        )}
        {Object.entries(groupedItems).map(([communityName, communityItems]) => (
          <div key={communityName} className='mb-2 pb-2 bg-gray-50 shadow-sm drop-shadow-md'>
            <div className='flex items-center gap-20 border-y border-black py-2 px-10'>
              <h2 id={`selectAll_${communityName}`} className='text-[0.6rem] sm:text-[1rem] font-poppins font-bold'>
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
                  height={50}
                  width={50}
                  className='h-10 w-10  border-black border'
                />
                <div className='text-[0.5rem]'>
                  <h3>{item.variant.product.name}</h3>
                  <h3>{item.variant.variant} <span>{item.variant.unitOfMeasurement}</span></h3>
                </div>
                <div className='ml-auto'>
                  <h3 className='text-[0.4rem] sm:text-sm '> {item.variant.product.isFree == true ? "Free" : `₱ ${item.variant.price}`}</h3>
                </div>
                <DeleteCartItemModal cartId={item.id} itemName={item.variant.product.name} deleteCartItem={deleteCartItem}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      </Suspense>
      {/* Display the subtotal based on selected items */}
      <div className='fixed bottom-0 w-full flex'>
        <div className='w-1/2 flex justify-center items-center bg-green py-5 text-[1rem] text-white font-semibold fon font-poppins'>
          <h1 className='text-center'>Sub Total:<span className='text-xs font-bold ml-10'>₱ {calculateSubtotal(selectedItems).toFixed(2)}</span></h1>
        </div>

        <button 
          onClick={() => handleCheckout(selectedItems)}
          disabled={ selectedItems.length < 1 ? true : false}
          className={`w-1/2 text-xs sm:text-2xl font-bold ${selectedItems.length < 1 ?'bg-yellow-200 text-gray-400' : "bg-yellow-400"} transition-all duration-1000 ease-linear`}>
          Checkout
        </button>
      </div>
      {}
    </div>
  );
}

export default CartPage;