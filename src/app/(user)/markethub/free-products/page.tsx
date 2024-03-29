import prisma from '@/lib/db/db'
import { Product } from '@/lib/types'
import React, { Suspense } from 'react'
import ProductModal from '../components/ProductModal'

async function page() {
  const freeProducts = await prisma.product.findMany({
    where:{
      isFree: {
        equals: true
      },
      status:{
          equals: "APPROVED"
      },
      variants:{
        some:{
          variant:{
            not: 0
          }
        }
      }
    },
    include:{
      community: true,
      variants: true
    },
    orderBy:{
      updatedAt: 'desc'
    }
  })
  return (
      <div className='w-full border-4 shadow-md bg-gray-50 drop-shadow-md border-gray-300 rounded-lg p-5'>
        <h1 className='text-xs md:text-3xl mb-3 font-semibold font-poppins py-3 border-b-2 border-b-gray-400'>Free Products available right now</h1>
        {freeProducts && freeProducts.length > 0 ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-6 w-full bg-white'>
              {freeProducts.map((product)=>(
                <div key={product.id} className=''>
                  <ProductModal product={product} lowestPrice={0} highestPrice={0} />
                </div>
              ))}
          </div>
        ):(
          <div className=''>
            There are no available free products right now!
          </div>
        )}
   
      </div>
  )
}

export default page