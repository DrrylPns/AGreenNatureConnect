import Image from 'next/image'
import { FiSearch, FiSettings, FiBell } from "react-icons/fi"
import LogoIcon from '../../../public/logo.png'
import React, { useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/Ui/Button'
import DisplayPhoto from '@/app/(pages)/discussion/images/displayphoto.png'
import { motion } from 'framer-motion';

export default function Navbar() {
    const [user , setUser] = useState(false)
  
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
            {user? (
                <div className="flex items-center gap-5 justify-between">
                    <motion.button
                        whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {}}
                        className="hidden text-icons md:block"           
                    >
                        <FiBell/>
                    </motion.button>
                    <motion.button
                        whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {}}
                        className="hidden text-icons md:block"           
                    >
                        <FiSettings/>
                    </motion.button>
                   <button className=' w-[2.5rem]'>
                    <Image 
                        src={DisplayPhoto}
                        alt='User Image'
                    />
                   </button>
                </div>
            ):(
                <div className=" w-[]">
                    <Link href="/login" className={buttonVariants({
                        variant: 'green',
                    })}>Sign In</Link>
                </div>
            )}
           
        </nav>
    )
}
