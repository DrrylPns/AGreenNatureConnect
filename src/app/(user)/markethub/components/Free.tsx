import prisma from '@/lib/db/db'
import React from 'react'
import Card from './Card'
import ProductModal from './ProductModal'
import { Button } from '@/components/ui/button'
import SeeMoreBtn from './SeeMoreBtn'

async function Free({
    communityId
}:{
    communityId: string | undefined
}) {
    const getFreeProductByCommunity = await prisma.product.findMany({
        where:{
            communityId: communityId,
            isFree: true,
            variants:{
                some:{
                    variant:{
                        not:0
                    }
                }
            }
        },
        include:{
            community:true,
            variants: true
        }
    })
  return (  
    <div className='w-full'>
        <div className='flex justify-between items-center border-b-2 border-b-gray-200 mb-5'>
            <h1 className='text-sm sm:text-lg font-poppins font-semibold'>Today's Free products</h1>
            <SeeMoreBtn/>
        </div>
        <div className='flex w-full gap-5 overflow-x-auto'>
            {getFreeProductByCommunity.length > 0 ? (
                getFreeProductByCommunity.map((freeProduct)=>(
                <div key={freeProduct.id} className=' w-32 sm:w-[20%] pb-5 flex-shrink-0'>
                    <ProductModal product={freeProduct} lowestPrice={0} highestPrice={0} />
                </div> 
            ))):(
                <div className='w-full text-center text-md text-gray-400 font-semibold font-poppins'>
                    <h1>There are no avaible free products right now!</h1>
                </div>
            )}
        </div>
    </div>
  )
}

export default Free