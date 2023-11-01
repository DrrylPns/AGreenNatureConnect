'use client'

import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import {BiImageAdd, BiPaperclip } from "react-icons/bi"
import { UserAvatar } from '@/app/components/UserAvatar'
import Link from 'next/link'
import { Button } from '@/app/components/Ui/Button'
import Loader, { RotatingLines } from "react-loader-spinner"; 


export default function CreatePost() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(false)
    return (
        <section className='sm:px-[3%] md:pl-[25%] lg:pr-[25%]'>
            {status === 'loading' ? (
                <div className='text-center flex justify-center'> 
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                    />
               </div> 
            ):(
            <>
                {session ? (
                <Link href={''} className=" flex justify-between items-center gap-5 bg-white rounded-lg drop-shadow-lg w-full px-5 py-5">
                    <Link href={'/profile'} className="w-[2.5rem]">
                        <UserAvatar
                            user={{ name: session?.user.username || null, image: session?.user.image || null }}
                            className="h-8 w-8"
                        />
                    </Link>
                    <input type="text" placeholder="Create post" className='px-5 py-2 w-[70%] bg-pale rounded-xl '/>
                    <Button variant={'green'}>Create</Button>
                
                </Link>
                ):(
               <></>
                )}
            </>
            )}
        </section>
    )
}
