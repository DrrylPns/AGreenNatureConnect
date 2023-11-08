import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <main className='flex flex-col gap-2'>
            <Link href="/employee/create-topic">Create Topic</Link>
            <Link href="/employee/create-blog">Create Blogs</Link>
        </main>
    )
}

export default page