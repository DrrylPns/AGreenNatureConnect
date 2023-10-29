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
import Search from './Search'

export default function Navbar() {
    const loginModal = useLoginModal()
    const [user, setUser] = useState(true)

    return (
        <nav className={`fixed flex justify-between gap-5 items-center shadow-sm drop-shadow-sm w-full z-30  px-3 py-2 min-h-[5rem] mix-h-[5rem]  bg-[#F0EEF6] md:px-20`}>
            <Link href="/" className="w-[3rem] text-center">
                <Image
                    src={LogoIcon}
                    alt="AGreen Nature Connect"
                    className=''
                />
            </Link>
            <Search />
            {user ? (
                <div className="flex items-center gap-3 justify-between">
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
