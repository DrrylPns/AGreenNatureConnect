import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { BadgeCheck, Hourglass, XCircle } from 'lucide-react'
import React from 'react'
import { ApprovedBlog } from './_components/ApprovedBlog'
import { PendingBlog } from './_components/PendingBlog'
import { DeclinedBlog } from './_components/DeclinedBlog'

const BlogRequestsPage = () => {
  return (
    <div className='w-full h-screen'>
      <Tabs defaultValue="pending">
        <TabsList className='w-full flex justify-evenly h-[200px]'>
          <TabsTrigger value="pending" className='h-[125px] border border-zinc-300 hover:opacity-80'>
            <Hourglass className='text-yellow-500 mr-0 md:mr-2' />
            <div className='hidden md:block'>Pending Blogs</div>
          </TabsTrigger>
          <TabsTrigger value="approved" className='h-[125px] border border-zinc-300 hover:opacity-80'>
            <BadgeCheck className='text-[#6ec530] mr-0 md:mr-2' />
            <div className='hidden md:block'>Approved Blogs</div>
          </TabsTrigger>
          <TabsTrigger value="declined" className=' h-[125px] border border-zinc-300 hover:opacity-80'>
            <XCircle className='text-rose-500 mr-0 md:mr-2' />
            <div className='hidden md:block'>Declined Blogs</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">

          <PendingBlog />

        </TabsContent>
        <TabsContent value="approved">

          <ApprovedBlog />

        </TabsContent>
        <TabsContent value="declined">

          <DeclinedBlog />

        </TabsContent>
      </Tabs>

    </div>
  )
}

export default BlogRequestsPage