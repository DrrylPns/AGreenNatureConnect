import prisma from '@/lib/db/db'
import { Product } from '@/lib/types'
import React, { Suspense } from 'react'
import ProductModal from '../components/ProductModal'
import Back from '../components/Back'

async function page() {
  const freeProducts = await prisma.product.findMany({
    where:{
      isFree: true,
      status: 'APPROVED',
      
    },
    include:{
      community: true,
      Stock: true,
      reviews: true
    },
    orderBy:{
      updatedAt: 'desc'
    }
  })

  return (
      <div className='w-full border-4 shadow-md bg-gray-50 drop-shadow-md border-gray-300 rounded-lg p-5'>
        <Back/>
        <h1 className='text-xs md:text-3xl mb-3 font-semibold font-poppins py-3 border-b-2 border-b-gray-400'>Free Products available right now</h1>
        {freeProducts.length > 0 ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-5 w-full bg-white'>
              {freeProducts.map((product)=>(
                <div key={product.id} className=''>
                  <ProductModal product={product} />
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