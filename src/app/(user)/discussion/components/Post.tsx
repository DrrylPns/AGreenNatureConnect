'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import DisplayPhoto from '@/app/(user)/discussion/images/displayphoto.png'
import ImagePost1 from '../images/imagepost1.png'
import ImagePost2 from '../images/imagepost2.png'
import PostButtons from './postButtons';
import { FaEllipsis } from 'react-icons/fa6'


export default function Post() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <section className='sm:px-[3%] md:pl-[25%] lg:pr-[25%]'>
            {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            <div className='bg-white w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-userImage rouded-full'>
                            {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                            <Image
                                src={DisplayPhoto}
                                alt='User Image'
                            />
                        </div>

                        <div className='flex items-baseline gap-3'>
                            {/*Username*/}
                            <h1 className='text-lg font-poppins font-medium'>leashane13</h1>
                            {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                            <h3 className='text-sm font-poppins'>7h</h3>
                        </div>
                    </div>

                    <button type='button' onClick={() => { }}>
                        <FaEllipsis />
                    </button>
                </div>
                {/**Description & Images */}
                <div className='mt-2 w-full'>
                    {/**Description */}
                    <p className={expanded ? '' : 'overflow-hidden overflow-ellipsis line-clamp-3'}>GARDEN!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, corporis quaerat. Aut velit corrupti adipisci dolorem dolor, libero vero consectetur iusto alias praesentium, molestiae ut pariatur nulla ullam neque esse?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla molestias fugit nisi fuga. Tenetur enim rerum possimus, cum provident, aspernatur qui, numquam obcaecati architecto aut sit quidem facere rem.</p>
                    <button onClick={toggleExpand} className='text-gray-400 font-poppins transition-all ease-in duration-100'> {expanded ? 'See less' : 'See more...'}</button>
                    {/**if there is no image uploaded by the user dont display this element else display all but*/}
                    {/** the Image container has a fix height, if there are two image then it will dived into 2 section*/}
                    <div className='w-full my-3'>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost1}
                                alt='User posted Image'
                               
                            />
                        </div>
                        <div className='mt-3 rounded-lg'>
                            <Image
                                src={ImagePost2}
                                alt='User posted Image'
                            />
                        </div>
                    </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
                    <PostButtons />
                </div>
            </div>
            {/*POSTS, use Fetch api here and map through all post and display it depending on the filtering*/}
            {/**We can make component for this div in order for this page to become short and clean */}
            <div className='bg-white w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-userImage rouded-full'>
                            {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                            <Image
                                src={DisplayPhoto}
                                alt='User Image'
                            />
                        </div>

                        <div className='flex items-baseline gap-3'>
                            {/*Username*/}
                            <h1 className='text-lg font-poppins font-medium'>leashane13</h1>
                            {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                            <h3 className='text-sm font-poppins'>7h</h3>
                        </div>
                    </div>

                    <button type='button' onClick={() => { }}>
                        <FaEllipsis />
                    </button>
                </div>
                {/**Description & Images */}
                <div className='mt-2 w-full'>
                    {/**Description */}
                    <p className={expanded ? '' : 'overflow-hidden overflow-ellipsis line-clamp-3'}>GARDEN!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, corporis quaerat. Aut velit corrupti adipisci dolorem dolor, libero vero consectetur iusto alias praesentium, molestiae ut pariatur nulla ullam neque esse?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla molestias fugit nisi fuga. Tenetur enim rerum possimus, cum provident, aspernatur qui, numquam obcaecati architecto aut sit quidem facere rem.</p>
                    <button onClick={toggleExpand} className='text-gray-400 font-poppins transition-all ease-in duration-100'> {expanded ? 'See less' : 'See more...'}</button>
                    {/**if there is no image uploaded by the user dont display this element else display all but*/}
                    {/** the Image container has a fix height, if there are two image then it will dived into 2 section*/}
                    <div className='w-full my-3'>

                    </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
                    <PostButtons />
                </div>
            </div>

            <div className='text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10'>
                <h3>There are no more available post right now.</h3>
            </div>
        </section>
    )
}
