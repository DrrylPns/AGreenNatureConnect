
import Card from './Card'
import { Product, Variants } from '@/lib/types'
import axios from 'axios'
import { Transition, Dialog, Tab } from '@headlessui/react'
import Image from 'next/image'
import useLoginModal from '@/lib/hooks/useLoginModal'
import { useSession } from 'next-auth/react'
import { toast } from '@/lib/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import prisma from '@/lib/db/db'
import ProductModal from './ProductModal'

const ProductItem = async() => {
 
  const vegetables = await prisma.product.findMany({
    where:{
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Vegetables"
      },
      variants:{
          some: {
              variant: {
                  not: 0
              }
          }
      }
    },
    include:{
        variants: true,
        community: true
    }
  })

  
  const fruits = await prisma.product.findMany({
    where:{
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Fruits"
      },
      
    },
    include:{
      community: true,
      variants: true
    }
   
  })

  
 /*
  const handleAddToCart = async () => {
    try {
    
      const addToCart = await axios.post('/api/markethub/cart', {
        variantId: selectedVariant?.id, communityId: selectedProduct?.communityId
      }).then(res => {
        toast({
          description: "Added to cart, Successfuly!.",
        })

      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Something went wrong",
          description: "Can't add to cart, please try again later",
          variant: "destructive",
        })
        console.error('Validation Error:', error.errors);
      } else {
        toast({
          title: "Something went wrong",
          description: "Can't add to cart, please try again later",
          variant: "destructive",
        })
        console.error('Error deleting cart item:', error);
      }
    } finally {
      setIsLoading(false)
    }
  */

  return (
    <div className='md:mt-[-3rem]'>
              <div className="grid grid-cols-2 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-x-[1px] min-h-screen border-t-2 p-5 border-gray-300 gap-4 font-poppins font-medium ">
                {fruits.length > 0 ? fruits.map((product) => {
                  const prices = product.variants.map((variant) => variant.price);
                  const lowestPrice = Math.min(...prices);
                  const highestPrice = Math.max(...prices);
                  if (product.variants.length < 1) {
                    return null
                  }

                  if (product.kilograms === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0) {
                    return null
                  } else {
                    return (
                      <ProductModal product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                    )
                  }
                }) : (
                  <div className='flex justify-center'>
                    <h1 className='text-2xl font-livvic font-medium'>There is no available fruits right now!</h1>
                  </div>
                )}
              </div> 
    </div>
  )
}
export default ProductItem