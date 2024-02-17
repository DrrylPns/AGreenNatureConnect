import prisma from '@/lib/db/db'
import React from 'react'
import Card from './Card'
import ProductModal from './ProductModal'

async function Free({
    communityId
}:{
    communityId: string | undefined
}) {
    const getFreeProductByCommunity = await prisma.product.findMany({
        where:{
            communityId: communityId,
            isFree: true
        },
        include:{
            community:true,
            variants:true
        }
    })
  return (
    <div className='w-full'>
        <h1 className='text-lg font-poppins font-semibold mb-5'>Today's Free products</h1>
        <div className='flex w-full gap-5 overflow-x-scroll'>
            {getFreeProductByCommunity.map((freeProduct)=>(
                <div key={freeProduct.id} className='w-[20%] flex-shrink-0'>
                    <ProductModal product={freeProduct} lowestPrice={0} highestPrice={0} />
                </div> 
            ))}
        </div>
    </div>
  )
}

export default Free