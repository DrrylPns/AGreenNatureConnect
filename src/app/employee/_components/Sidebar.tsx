"use client"
import { BookOpen, FileText, Home, LogOut, PlaySquare, Speech, Store, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// interface SidebarProps {
//     name: string | undefined;
// }

const Sidebar = ({
  // name
}) => {
  const router = useRouter()

  return (
    <section className='max-w-[320px] flex left-0 fixed py-3 px-11 h-screen border-r shadow-sm bg-[#7ef9bf]'>
      <div className='flex flex-col gap-3 justify-between'>
        <div>
          <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
          {/* <h1 className='text-lg'>{name} Community Dashboard</h1> */}
        </div>

        <div className='flex flex-col text-[16px] gap-7 mb-[350px]'>
          <Link className='flex flex-row gap-3' href={"/employee"}>
            <Home strokeWidth={1} />
            Dashboard
          </Link>

          <Link href="#"
            className='flex flex-row gap-3'>
            <PlaySquare strokeWidth={1} />
            Video Tutorial
          </Link>

          <Link href="/employee/create-materials"
            className='flex flex-row gap-3'>
            <BookOpen strokeWidth={1} />
            Learning Material
          </Link>

          {/* <Link href="#">Blog</Link> */}
          {/* <Link href="/employee/create-products">Create Products</Link> */}

          <Link href="/employee/create-blog"
            className='flex flex-row gap-3'>
            <FileText strokeWidth={1} />
            Blog
          </Link>

          <Link href="/employee/create-topic"
            className='flex flex-row gap-3'>
            <Speech strokeWidth={1} />
            Topics
          </Link>

          <Link href="/employee/inventory"
            className='flex flex-row gap-3'>
            <Store strokeWidth={1} />
            Market Hub
          </Link>

        </div>

        <div className='mb-[30px] flex flex-row gap-3 cursor-pointer' onClick={() => signOut({
          redirect: false
        }).then(() => {
          router.push("/discussion")
        })}>
          <LogOut strokeWidth={1} />
          Logout
        </div>

      </div>
    </section >
  )
}

export default Sidebar