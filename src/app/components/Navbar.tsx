"use client"
import Image from 'next/image'
import { FiSearch, FiSettings, FiBell } from "react-icons/fi"
import LogoIcon from '../../../public/logo.png'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/Ui/Button'
import DisplayPhoto from '@/app/(pages)/discussion/images/displayphoto.png'
import { motion } from 'framer-motion';
import useLoginModal from '@/lib/hooks/useLoginModal'
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from './Ui/Avatar'
import { Loader2 } from 'lucide-react'
import MenuItem from './MenuItem'

export default function Navbar() {
    const loginModal = useLoginModal()
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    // loading TODO loader loading.tsx ?? 
    // if (status === "loading") {
    //     return (
    //         <>
    //             <Loader2 className="flex justify-center items-center animate-spin z-50" width={100} height={100} />
    //         </>
    //     )
    // }

    const isImageNull = session?.user.image === null

    return (
        <nav className={`fixed flex w-full z-50 justify-between px-3 py-2 min-h-[5rem] mix-h-[5rem] items-center bg-white md:px-20`}>
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

                    {/* TODO: ADD DROP DOWN CONTENTS IS DEPENDING ON UI */}
                    {/* <Avatar>
                        <AvatarImage
                            className='cursor-pointer'
                            src={`${isImageNull ? "/images/avatar-placeholder.jpg" : session?.user.image}`}
                            width={35}
                            height={35}
                            alt='User Profile' />
                        <AvatarFallback>User Profile</AvatarFallback>
                    </Avatar> */}
                    <div
                        onClick={toggleOpen}
                        className='flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition'
                    >
                        <div className='hidden md:block max-md:block'>
                            {/* AVATAR */}
                            <Avatar>
                                <AvatarImage
                                    className='cursor-pointer'
                                    src={`${isImageNull ? "/images/avatar-placeholder.jpg" : session?.user.image}`}
                                    width={35}
                                    height={35}
                                    alt='User Profile' />
                                <AvatarFallback>User Profile</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    {isOpen && (
                        <div className='absolute shadow-md w-[40vw] md:w-[10%] bg-white dark:bg-[#0A0A0A] dark:border overflow-hidden right-0 top-12 text-sm rounded-md'>
                            <div className='flex flex-col cursor-pointer'>
                                {session ? (
                                    <>
                                        <MenuItem
                                            onClick={() => { }} // TODO
                                            label='My Profile'
                                        />
                                        <MenuItem
                                            onClick={() => signOut()}
                                            label='Log Out'
                                        />
                                    </>
                                ) : (
                                    <>

                                    </>
                                )}
                            </div>
                        </div>
                    )}
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

