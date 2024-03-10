'use client'
import useLoginModal from '@/lib/hooks/useLoginModal';
import React, { useEffect, useState } from 'react'
import { BsCart4 } from 'react-icons/bs';
import CartItemNumber from './cartItemNumber';
import axios from 'axios';
import { useCart } from '@/contexts/CartContext';

function CartIcon() {
  const { cartNumber, setCartNumber} = useCart();
  const loginModal = useLoginModal();
  
  useEffect(()=>{
    getCartCount()
  },[cartNumber])

  const getCartCount = async () => {
    try {
      const cartCount =  (await axios.get(`/api/markethub/cart/cartNumber`)).data
      setCartNumber(cartCount)
    } catch (error) {
      
    }
    
  }
  return (
    <div className='relative'>
      <div className='absolute top-[-10px] right-[-3px] text-[0.6rem] sm:text-xs px-2 py-1 bg-red-600 rounded-full text-white'>
        <h1 className=''>{cartNumber > 99 ? "99+" : cartNumber}</h1>
      </div>
      <BsCart4 />
   
    </div>

  )
}

export default CartIcon