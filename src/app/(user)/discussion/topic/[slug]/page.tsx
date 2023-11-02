import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import React from 'react'
import { notFound } from 'next/navigation'
import TopicCreatePost from '@/app/components/(user)/TopicCreatePost'

interface TopicProps {
    params: {
        slug: string
    }
}

const page = async ({params}: TopicProps) => {
    const { slug } = params
    
    const session = await getAuthSession()

    const topic = await prisma.topic.findFirst({
        where: {name: slug},
        include: {
            posts: {
                include: {
                    author: true,
                    likes: true,
                    comments: true,
                    Topic: true,
                    Report: true,
                },
            orderBy: {
                createdAt: 'desc'
            },
            take: INFINITE_SCROLLING_PAGINATION_RESULTS
            }
        }
    })

    if(!topic) return notFound()

  return (
    <section className=''>
        <h1 className='font-bold text-3xl md:text-4xl h-14'>
            {topic.name}
        </h1>
        <TopicCreatePost session={session}/>
        {/* USER POSTS IN TOPIC TODO */}
    </section>
  )
}

export default page