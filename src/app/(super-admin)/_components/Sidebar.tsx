"use client"
import { BookOpen, Cog, FileText, History, Home, LayoutDashboard, LogOut, LogOutIcon, PlaySquare, Settings, Speech, Store, TicketIcon, TreePine, User, UserPlus, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { FiRefreshCw } from 'react-icons/fi';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover';
import useSettingsModal from '@/lib/hooks/useSettingsModal';
import { TbUserSquareRounded } from 'react-icons/tb';

const Sidebar = () => {

    const router = useRouter()
    const pathname = usePathname()
    const url = pathname.replace("/", "")
    const { onOpen } = useSettingsModal()

    console.log(url)

    return (
        <div>
            {/* MOBILE NAV */}
            <div className='w-full border-b shadow-md'>
                <div className='grid grid-cols-7 p-3 items-center justify-center text-center lg:hidden bg-[#7ef9bf]'>

                    <Link href="/communities" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "communities" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <Home strokeWidth={1} />
                    </Link>
                    {/* <Link href="/admin/manage-employees" className={`mx-auto text-neutral-500 p-2 m rounded-lg ${url === "admin/manage-employees" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <User strokeWidth={1} />
                    </Link>
                    <Link href="/admin/video-requests" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/video-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <PlaySquare strokeWidth={1} />
                    </Link>
                    <Link href="/admin/material-requests" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/material-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <BookOpen strokeWidth={1} />
                    </Link>
                    <Link href="/admin/blog-requests" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/blog-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <FileText strokeWidth={1} />
                    </Link>

                    <Link href="/admin/inventory" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/inventory" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                        <Store strokeWidth={1} />
                    </Link> */}
                    <Popover>
                        <PopoverTrigger asChild className={`mx-auto text-neutral-500 rounded-lg ${url === "adminSettings" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white p-1 w-[29px] h-[29px]" : "hover:bg-gray-200 text-black"}`} onClick={onOpen}>
                            <Settings />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='space-y-2'>
                                <Link href="settings" className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg ${url === "adminSettings" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                                    <Cog className='w-4 h-4' />
                                    <span className='text-sm font-medium'>Settings</span>
                                </Link>

                                <div className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-200 text-black`}
                                    onClick={() => signOut({
                                        redirect: false
                                    }).then(() => {
                                        router.push("/discussion")
                                    })}>
                                    <LogOutIcon className='w-4 h-4' />
                                    <span className='text-sm font-medium'>Log Out</span>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="flex max-lg:hidden">
                <aside className="fixed top-0 h-screen w-64 text-gray-800 p-4 bg-[#7ef9bf]">
                    <Link href={"/discussion"} className='flex items-center mb-4 space-x-1'>
                        <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
                    </Link>
                    <nav className="space-y-2">

                        <Link href="/communities" className={`w-full flex items-center space-x-2 py-2 pl-12 px-2 rounded-lg ${url === "communities" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <TbUserSquareRounded />
                            <span className="text-sm font-medium">Urban Farms</span>
                        </Link>

                        {/* <Link href="/admin/manage-employees" className={`w-full flex items-center space-x-2 pl-12 py-2 px-2 rounded-lg ${url === "admin/manage-employees" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <User strokeWidth={1} />
                            <span className="text-sm font-medium">Employees</span>
                        </Link>

                        <Link href="/admin/video-requests" className={`w-full flex items-center space-x-2 py-2 pl-12 px-2 rounded-lg ${url === "admin/video-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <PlaySquare strokeWidth={1} />
                            <span className="text-sm font-medium">Video Tutorial</span>
                        </Link>

                        <Link href="/admin/material-requests" className={`w-full flex items-center space-x-2 py-2 pl-12 px-2 rounded-lg ${url === "admin/material-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <BookOpen strokeWidth={1} />
                            <span className="text-sm font-medium">Learning Material</span>
                        </Link>

                        <Link href="/admin/blog-requests" className={`w-full flex items-center space-x-2 py-2 px-2 pl-12 rounded-lg ${url === "admin/blog-requests" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <FileText strokeWidth={1} />
                            <span className="text-sm font-medium">Blog</span>
                        </Link>

                        <Link href="/admin/inventory" className={`w-full flex items-center space-x-2 py-2 px-2 pl-12 rounded-lg ${url === "admin/inventory" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
                            <Store strokeWidth={1} />
                            <span className="text-sm font-medium">Market Hub</span>
                        </Link> */}

                    </nav>
                    <div className='space-y-2 absolute bottom-10 w-[85%]'>
                        <div className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg ${url === "adminSettings" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`} onClick={onOpen}>
                            <Cog className='w-4 h-4' />
                            <span className='text-sm font-medium'>Settings</span>
                        </div>
                        <div className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-200 text-black`}
                            onClick={() => signOut({
                                redirect: false
                            }).then(() => {
                                router.push("/discussion")
                            })}>
                            <LogOutIcon className='w-4 h-4' />
                            <span className='text-sm font-medium'>Log Out</span>
                        </div>

                        {/* <div className='mb-[30px] flex flex-row gap-3 cursor-pointer' onClick={() => signOut({
                            redirect: false
                        }).then(() => {
                            router.push("/discussion")
                        })}>
                            <LogOut strokeWidth={1} />
                            Logout
                        </div> */}
                    </div>
                </aside>
            </div >
        </div >
        // <section className='max-w-[320px] flex left-0 fixed py-3 px-11 h-full border-r shadow-sm bg-[#7ef9bf]'>
        //     <div className='flex flex-col gap-3 justify-between flex-1'>
        //         <div>
        //             <Link href={"/discussion"}>
        //                 <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
        //             </Link>
        //             {/* <h1 className='text-lg'>{name} Community Dashboard</h1> */}
        //         </div>

        //         <div className='flex flex-col text-[16px] gap-7 mb-[350px]'>
        //             <Link className='flex flex-row gap-3' href={"/admin"}>
        //                 <Home strokeWidth={1} />
        //                 Dashboard
        //             </Link>

        //             <Link href="/admin/manage-employees"
        //                 className='flex flex-row gap-3'>
        //                 <User strokeWidth={1} />
        //                 Employees
        //             </Link>

        //             <Link href="/admin/video-requests"
        //                 className='flex flex-row gap-3'>
        //                 <PlaySquare strokeWidth={1} />
        //                 Video Tutorial
        //             </Link>

        //             <Link href="/admin/material-requests"
        //                 className='flex flex-row gap-3'>
        //                 <BookOpen strokeWidth={1} />
        //                 Learning Material
        //             </Link>

        //             <Link href="/admin/blog-requests"
        //                 className='flex flex-row gap-3'>
        //                 <FileText strokeWidth={1} />
        //                 Blog
        //             </Link>

        //             {/* <Link href="#"
        //                 className='flex flex-row gap-3'>
        //                 <Speech strokeWidth={1} />
        //                 Topics
        //             </Link> */}

        //             <Link href="/admin/inventory"
        //                 className='flex flex-row gap-3'>
        //                 <Store strokeWidth={1} />
        //                 Market Hub
        //             </Link>

        //         </div>

        //         <div className='mb-[30px] flex flex-row gap-3 cursor-pointer' onClick={() => signOut({
        //             redirect: false
        //         }).then(() => {
        //             router.push("/discussion")
        //         })}>
        //             <LogOut strokeWidth={1} />
        //             Logout
        //         </div>

        //     </div>
        // </section >
    )
}

export default Sidebar