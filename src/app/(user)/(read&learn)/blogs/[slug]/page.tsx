import prisma from '@/lib/db/db'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
    params: {
        slug: string
    }
}

const page = async ({ params }: PageProps) => {

    const blog = await prisma.blog.findFirst({
        where: {
            id: params.slug
        },
        include: {
            author: true
        }
    })

    if (!blog) return notFound()

    return (
        <div className='flex flex-col items-center pt-[120px] gap-5'>
            <div>Creator: {blog.author.username}</div>
            <div className='text-5xl'>{blog.title}</div>
            {/* CONTENT HERE */}

            <div>Render content here.</div>
            <div className='text-muted-foreground'>Created At: {formatDate(blog.createdAt)}</div>
        </div>
    )
}

export default page