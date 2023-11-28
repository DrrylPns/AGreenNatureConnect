import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <section>
            <div className='flex flex-col gap-3'>
                <Link href="/admin">Dashboard</Link>
                <Link href="/">Create Employee</Link>
                <Link href="/">Products</Link>
                <Link href="/">Transaction History</Link>
            </div>
        </section>
    )
}

export default Sidebar