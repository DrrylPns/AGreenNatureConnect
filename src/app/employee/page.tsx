import prisma from '@/lib/db/db'
import Link from 'next/link'
import React from 'react'
import Sidebar from './_components/Sidebar'
import { getAuthSession } from '@/lib/auth'

const page = async () => {

    const session = await getAuthSession()

    const community = await prisma.community.findFirst({
        where: {
            userId: session?.user.id
        },
        include: {
            user: true
        }
    })

    return (
        <main className='flex flex-col gap-2 h-screen'>
            {/* <Sidebar name={community?.name} /> */}
            <div className='text-3xl mt-5'>
                {community?.name} Dashboard
            </div>
            {/* TODO: TREMOR GRAPHS */}
        </main>
    )
}

export default page