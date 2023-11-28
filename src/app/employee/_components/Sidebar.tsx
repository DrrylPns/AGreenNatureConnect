import Link from 'next/link'
import React from 'react'

// interface SidebarProps {
//     name: string | undefined;
// }

const Sidebar = ({
    // name
}) => {
  return (
    <section className='max-w-[320px] flex left-0 fixed py-3 px-11 h-screen border-r shadow-sm'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg'>Community Dashboard</h1>
        {/* <h1 className='text-lg'>{name} Community Dashboard</h1> */}
        <Link href="/employee/">Dashboard</Link>
        <Link href="/employee/inventory">Products</Link>
        <Link href="/employee/create-products">Create Products</Link>
        <Link href="/employee/create-topic">Create Topic</Link>
        <Link href="/employee/create-blog">Create Blogs</Link>
      </div>
    </section>
  )
}

export default Sidebar