import { buttonVariants } from "@/app/components/Ui/Button"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { format } from "date-fns"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: 'AGreen Nature Connect',
    description: 'Greens in the Streets: Farming for a Better Tomorrow',
  }
  
const Layout = async ({
    children,
    params: { slug },
  }: {
    children: ReactNode
    params: { slug: string }
  }) => {
    const session = await getAuthSession()
  
    const topic = await prisma.topic.findFirst({
      where: { name: slug },
      include: {
        posts: {
          include: {
            author: true,
            likes: true,
          },
        },
      },
    })
  
    if (!topic) return notFound()
  
    const postCountInTopic = await prisma.post.count()
  
    return (
      <div className='sm:container max-w-7xl mx-auto h-full pt-[90px]'>
        <div className="ml-[120px]">
          {/* TODO: back button */}
  
          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
            <ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>
  
            {/* info sidebar kada topic */}
            <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last xl:mt-11'>
              <div className='px-6 py-4'>
                <p className='font-semibold py-3'>About {topic.name}</p>
              </div>
              <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500'>Topic Started at</dt>
                  <dd className='text-gray-700'>
                    <time dateTime={topic.createdAt.toDateString()}>
                      {format(topic.createdAt, 'MMMM d, yyyy')}
                    </time>
                  </dd>
                </div>
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500'>Posts</dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='text-gray-900'>{postCountInTopic}</div>
                  </dd>
                </div>
  
                <Link
                  className={buttonVariants({
                    variant: 'green',
                    className: 'w-full mb-6',
                  })}
                  href={`r/${slug}/submit`}>
                  Create Post
                </Link>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Layout