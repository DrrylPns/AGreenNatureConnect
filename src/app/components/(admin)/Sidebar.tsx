import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <section className=' max-w-[320px] flex left-0 fixed py-3 px-11 h-screen border-r shadow-sm'>
            <div className='flex flex-col gap-3'>
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/community">Communities</Link>
                <Link href="/admin/create-community">Create Community</Link>
                {/* <Link href="/admin/create-employee">Create Employee</Link> */}
                <Link href="/admin/blog-requests">Blog Requests</Link>
                <Link href="/admin/article-requests">Article Requests</Link>
                {/* <Link href="/admin/">Products</Link> */}
                {/* <Link href="/">Transaction History</Link> */}
            </div>
        </section>
    )
}

export default Sidebar