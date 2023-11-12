import EditorOutput from '@/app/components/(user)/EditorOutput'
import { Separator } from '@/app/components/Ui/Separator'
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
            <div className='max-w-4xl flex flex-col m-auto items-center gap-11'>
                <div className='flex flex-col mt-[120px] gap-5'>
                    <div>Creator: {blog.author.username}</div>
                    <div className='text-5xl'>{blog.title}</div>
                    <div className='text-muted-foreground'>Blog Posted At: {formatDate(blog.createdAt)}</div>
                </div>

                <Separator className='bg-zinc-300'/>

                <div className='w-auto h-screen'>
                    <EditorOutput content={blog.content} />
                </div>
            </div>
    )
}

export default page