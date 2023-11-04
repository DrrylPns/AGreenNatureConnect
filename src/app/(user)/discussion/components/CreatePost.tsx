'use client'
import Image from 'next/image'
import React, { useState } from 'react'
// import DisplayPhoto from '/public/images/displayphoto.png'
import DisplayPhoto from '@/app/(user)/discussion/images/displayphoto.png'
import { BiLike, BiComment, BiShare, BiImageAdd, BiPaperclip } from "react-icons/bi"

export default function CreatePost() {
    const [user, setUser] = useState(false)
    return (
        <section className='sm:px-[3%] md:pl-[25%] lg:pr-[25%]'>
            <div className=" flex justify-between items-center gap-5 bg-white rounded-lg drop-shadow-lg w-full px-5 py-5">
                {/*User Image, add default image if the user doesn't have DP, user image will comes from the backend*/}
                <div className="w-[2.5rem]">
                    {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                    <Image
                        src={DisplayPhoto}
                        alt='User image'
                    />
                </div>
                <input type='text' placeholder='Create your post' disabled={true} value={''} className='bg-[#f0eef6] w-[70%] px-10 py-3 rounded-full' />
                {user ? (
                    <button type='button' className='col-span-2 flex justify-center gap-5 items-center text-[2.5rem] text-black'>
                        <BiImageAdd />
                        <BiPaperclip />
                    </button>
                ) : (
                    <button type='button' className='bg-green text-white font-poppins font-semibold px-3 py-2 rounded-lg'>
                        Post
                    </button>
                )}

            </div>
        </section>
    )
}
