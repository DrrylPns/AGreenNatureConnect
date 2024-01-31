'use client'
import { Cart } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {
  const [cartItems, setCartItems] = useState<Cart[]>([])

  useEffect(()=>{
    fetchCartItems()
  },[])

  const fetchCartItems = async() =>{
    try {
      const response = await axios.get('/api/markethub/cart')
      setCartItems(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(cartItems)
  
  return (
    <div className="pt-[8rem] md:pt-[6rem] sm:px-[3%] md:pl-[25%] z-0 bg-white px-3">
        <h1>Cart</h1>
        <div>
          {cartItems.length == 0 && (
            <div>
              <h2>There's no items in your cart right now</h2>
              <span>Shop now</span>
            </div>
          )}
          {cartItems.length > 0 && cartItems.map((item: Cart) => (
            <div>
              <h2>{item.variant.product.community.name} whahsadasd</h2>
              <div>
                
              </div>

            </div>
          ))}
        </div>
    </div>
  )
}

export default page