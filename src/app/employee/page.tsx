import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <Link href="/employee/create-topic">Create Topic</Link>
            <Link href="/employee/create-blog">Create Blogs</Link>
        </>
    )
}

export default page