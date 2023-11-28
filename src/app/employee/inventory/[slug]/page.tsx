
import React from 'react'
import { UpdateProduct } from './_components/UpdateProduct'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'

interface InventoryUpdateProps {
    params: {
        slug: string
    }
}

const page = async ({params}: InventoryUpdateProps) => {
    const session = await getAuthSession()

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            userId: user?.id
        }
    })

    const product = await prisma.product.findFirst({
        where:{
            id: params.slug,
            communityId: community?.id
        }
    })

  return (
    <div className='w-full flex flex-col justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold'>Update product</h1>
            <p className='text-muted-foreground'>Note: You are about to update a product in your respected community.</p>
        </div>

        <div className='md:w-[30%]'>
            <UpdateProduct product={product}/>
        </div>
    </div>
  )
}

export default page