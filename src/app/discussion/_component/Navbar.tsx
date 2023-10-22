import Image from 'next/image'
import { FiSearch } from "react-icons/fi"
import LogoIcon from '../images/logo.png'
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/Ui/Button'

export default function Navbar() {
    return (
        <nav className={`fixed grid grid-cols-12 gap-4 z-50 bg-[#F0EEF6] w-full px-20 py-3 drop-shadow-lg shadow-md`}>
            <Link href="/" className="col-span-3 my-auto">
                <Image
                    src={LogoIcon}
                    alt="AGreen Nature Connect"
                    style={{ minWidth: '50px', maxWidth: '15%', }}
                />
            </Link>
            <div className="relative text-center col-span-6 my-auto">
                <div className=" drop-shadow-lg w-2/3 mx-auto">
                    <input type="text" placeholder="Search for people" className=' rounded-full w-full pl-10 px-4 py-3' />
                    <div className="absolute top-2 left-2 p-2">
                        <FiSearch />
                    </div>
                </div >
            </div>
            {/*if user not sign in display SignIn btn else Profile of the user with settings and notif Icons */}
            <div className="col-span-3 drop-shadow-lg text-end my-auto">
                <Link href="/login" className={buttonVariants({
                    variant: 'green',
                })}>Sign In</Link>
            </div>
        </nav>
    )
}
