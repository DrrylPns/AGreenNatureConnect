import BlogPosts from '@/app/components/(user)/BlogPosts'
import { getAuthSession } from '@/lib/auth'
import React from 'react'

async function Blogs({ }: {

}) {

  const session = await getAuthSession();

  return (
    <section className='pt-32 flex items-center flex-col'>
      <h1 className="font-bold text-3xl md:text-4xl text-green">AGreen <span className='text-amber'>Nature</span> Connect Blogs</h1>

      <div className='grid grid-cols-1 gap-y-4 py-6'>
        <BlogPosts session={session} />
      </div>
    </section>
  )
}

export default Blogs