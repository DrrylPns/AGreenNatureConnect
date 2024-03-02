import prisma from '@/lib/db/db'
import React from 'react'

async function CartItemNumber() {
    const cartItemCount = await prisma.cart.count()
    console.log(cartItemCount)
  return (
    <div className='absolute bg-yellow-400 text-white'>
        <h1>{cartItemCount}</h1>
    </div>
  )
}

export default CartItemNumber