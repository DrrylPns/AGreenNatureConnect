"use client"
import Image from 'next/image'
import { FiSearch, FiSettings, FiBell } from "react-icons/fi"
import LogoIcon from '../../../public/logo.png'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/Ui/Button'
import { motion } from 'framer-motion';
import useLoginModal from '@/lib/hooks/useLoginModal'
import { useSession, signOut } from "next-auth/react"
import UserAccountAvatar from './UserAccountAvatar'

const Navbar = () => {
    const loginModal = useLoginModal()
    const { data: session, status } = useSession();

    return (
        <nav className={`fixed flex w-full z-40 justify-between px-3 py-2 min-h-[5rem] max-h-[5rem] items-center bg-white md:px-20`}>
            <Link href="/" className="w-[3rem] text-center">
                <Image
                    src={LogoIcon}
                    alt="AGreen Nature Connect"
                    className=''
                />
            </Link>
            <div className="hidden sm:block relative min-w-fit w-[30%]">
                <input type="text" placeholder="Search for people" className='hidden rounded-full w-full pl-10 py-3 bg-[#F0EEF6] sm:block' />
                <div className="hidden absolute top-4 left-3 sm:block">
                    <FiSearch />
                </div>
            </div >
            <div className='sm:hidden flex justify-end w-[60%]'>
                <button className="bg-[#F0EEF6] p-2 rounded-full sm:hidden ">
                    <FiSearch />
                </button>
            </div>

            {/*if user not sign in display SignIn btn else Profile of the user with settings and notif Icons */}
            {session ? (
                <div className="flex items-center gap-5 justify-between">
                    <motion.button
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { }}
                        className="hidden text-icons md:block"
                    >
                        <FiBell />
                    </motion.button>
                    <motion.button
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { }}
                        className="hidden text-icons md:block"
                    >
                        <FiSettings />
                    </motion.button>

                    {/* TODO: ADD DROP DOWN CONTENTS IT IS DEPENDING ON UI */}
                    <UserAccountAvatar />
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

export default Navbar