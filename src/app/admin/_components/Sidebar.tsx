"use client"
import { BookOpen, FileText, Home, LogOut, PlaySquare, Speech, Store, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {

    const router = useRouter()

    return (
        <section className='max-w-[320px] flex left-0 fixed py-3 px-11 h-full border-r shadow-sm bg-[#7ef9bf]'>
            <div className='flex flex-col gap-3 justify-between'>
                <div>
                    <Link href={"/discussion"}>
                        <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
                    </Link>
                    {/* <h1 className='text-lg'>{name} Community Dashboard</h1> */}
                </div>

                <div className='flex flex-col text-[16px] gap-7 mb-[350px]'>
                    <Link className='flex flex-row gap-3' href={"/admin"}>
                        <Home strokeWidth={1} />
                        Dashboard
                    </Link>

                    <Link href="/admin/manage-employees"
                        className='flex flex-row gap-3'>
                        <User strokeWidth={1} />
                        Employees
                    </Link>

                    <Link href="/admin/video-requests"
                        className='flex flex-row gap-3'>
                        <PlaySquare strokeWidth={1} />
                        Video Tutorial
                    </Link>

                    <Link href="/admin/material-requests"
                        className='flex flex-row gap-3'>
                        <BookOpen strokeWidth={1} />
                        Learning Material
                    </Link>

                    <Link href="/admin/blog-requests"
                        className='flex flex-row gap-3'>
                        <FileText strokeWidth={1} />
                        Blog
                    </Link>

                    <Link href="#"
                        className='flex flex-row gap-3'>
                        <Speech strokeWidth={1} />
                        Topics
                    </Link>

                    <Link href="/admin/inventory"
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