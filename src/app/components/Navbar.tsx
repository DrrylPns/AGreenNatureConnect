"use client"

import Image from 'next/image'
import { FiSearch, FiSettings, FiBell } from "react-icons/fi"
import LogoIcon from '../../../public/logo.png'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/app/components/Ui/Button'
import DisplayPhoto from '@/app/(pages)/discussion/images/displayphoto.png'
import { motion } from 'framer-motion';
import useLoginModal from '@/lib/hooks/useLoginModal'
import Settings from '@/app/components/(user)/Settings'
import Notification from './(user)/Notification'
import UserPhoto from './(user)/UserPhoto'

export default function Navbar() {
    const loginModal = useLoginModal()
    const [user, setUser] = useState(true)

    return (
        <nav className={`fixed flex shadow-sm drop-shadow-sm w-full z-50 justify-between px-3 py-2 min-h-[5rem] mix-h-[5rem] items-center bg-[#F0EEF6] md:px-20`}>
            <Link href="/" className="w-[3rem] text-center">
                <Image
                    src={LogoIcon}
                    alt="AGreen Nature Connect"
                    className=''
                />
            </Link>
            <div className="hidden sm:block relative min-w-fit w-[30%]">
                <input type="text" placeholder="Search for people" className='hidden rounded-full w-full pl-10 py-3 bg-white sm:block' />
                <div className="hidden absolute top-4 left-3 sm:block">
                    <FiSearch />
                </div>
            </div >
            <div className='sm:hidden flex justify-end w-[60%]'>
                <button className="bg-white p-2 rounded-full sm:hidden ">
                    <FiSearch />
                </button>
            </div>

            {/*if user not sign in display SignIn btn else Profile of the user with settings and notif Icons */}
            {user ? (
                <div className="flex items-center gap-5 justify-between">
                    <Notification />
                    <Settings />
                    <UserPhoto />
                </div>
            ) : (
                <div className="w-[]">
                    <Button
                        onClick={loginModal.onOpen}
                        variant={'green'}
                    >Sign In</Button>
                </div>
            )}

        </nav>
    )
}
