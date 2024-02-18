import useLoginModal from '@/lib/hooks/useLoginModal';
import React from 'react'
import { BsCart4 } from 'react-icons/bs';
import CartItemNumber from './cartItemNumber';

function CartIcon() {
    const loginModal = useLoginModal();
    
  return (
    <button onClick={loginModal.onOpen} className="text-white">
        <BsCart4 />
        <CartItemNumber/>
    </button>
  )
}

export default CartIcon