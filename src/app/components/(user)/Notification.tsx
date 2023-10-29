'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { FiBell } from 'react-icons/fi'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DisplayPhoto from '../../(pages)/discussion/images/displayphoto.png'


export default function Notification() {
   
  
      
  return (
    <div className='md:flex items-center hidden'>
        <Menu>
            <Menu.Button className=' w-[2.5rem]'>
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
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="notification hidden absolute top-20 drop-shadow-md shadow-sm h-[30rem] right-36 md:flex flex-col bg-white p-5 rounded-2xl w-[30rem] ">
                    <div className='flex justify-between'>
                        <h1 className='font-poppins font-bold'>Notification</h1>
                        <button type='button' onClick={()=>{}} className=' text-blue-700'>Mark all as read</button>
                    </div>
                    <div className='flex justify-between pl-5 mt-1'>
                        <h1 className='font-poppins font-bold'>Today</h1>
                        
                    </div>
                    {/**map through latest interaction to all your post that only happen today. Maximum of 2 latest interaction*/}
                    <Menu.Item key="" as={Fragment}>
                    {({ active }) => (
                    <Link
                    href={'/'}
                    className={`${
                        active ? 'bg-[#F0EEF6] text-white px-3' : 'bg-white px-3 text-black'
                    } border-b border-black`}
                    >
                        <div className='flex gap-3 h-[4rem] justify-between items-center text-gray-400'>
                            <div className='w-[2rem]'>
                                <Image src={DisplayPhoto} alt=''/>
                            </div>
                            {/**latest interactions to your post */}                
                            <p className='w-[80%]'>
                                <span className='font-bold text-black'>{/**latest user that interacts with your specific post*/}leashane13 </span>and 
                                <span>{/** if likes display the number of likes, if comments display the number of comments  */} 23</span> 
                                <span> other people {/**if there is only one comment or like hide this */}</span>
                                <span>{/**like or comment*/}like </span> your post.
                            </p>
                            <div className='w-[10%]'>
                                <h6 className='text-[0.5rem] text-gray-500 '>2 min</h6>
                            </div>
                        </div>
                    </Link>
                    )}
                    </Menu.Item>
                    <Menu.Item key="" as={Fragment}>
                    {({ active }) => (
                    <Link
                    href={'/'}
                    className={`${
                        active ? 'bg-[#F0EEF6] text-white px-3' : 'bg-white px-3 text-black'
                    } border-b border-black`}
                    >
                        <div className='flex gap-3 h-[4rem] justify-between items-center text-gray-400'>
                            <div className='w-[2rem]'>
                                <Image src={DisplayPhoto} alt=''/>
                            </div>
                            {/**latest interactions to your post */}                
                            <p className='w-[80%]'>
                                <span className='font-bold text-black'>{/**latest user that interacts with your specific post*/}Yi Sun Shin </span>and 
                                <span>{/** if likes display the number of likes, if comments display the number of comments  */} 23</span> 
                                <span> other people {/**if there is only one comment or like hide this */}</span>
                                <span>{/**like or comment*/}comment on</span> your post.
                            </p>
                            <div className='w-[10%]'>
                                <h6 className='text-[0.5rem] text-gray-500 '>2 min</h6>
                            </div>
                        </div>
                    </Link>
                    )}
                    </Menu.Item>
                    <div className='flex justify-between pl-5 mt-2'>
                        <h1 className='font-poppins font-bold'>This week</h1>
                    </div>
                    {/**map through latest interaction to all your post that only happen this week. maximum of 2 latest interaction*/}
                    <Menu.Item key="" as={Fragment}>
                    {({ active }) => (
                    <Link
                    href={'/'}
                    className={`${
                        active ? 'bg-[#F0EEF6] text-white px-3' : 'bg-white px-3 text-black'
                    } border-b border-black`}
                    >
                        <div className='flex gap-3 h-[4rem] justify-between items-center text-gray-400'>
                            <div className='w-[2rem]'>
                                <Image src={DisplayPhoto} alt=''/>
                            </div>
                            {/**latest interactions to your post */}                
                            <p className='w-[80%]'>
                                <span className='font-bold text-black'>{/**latest user that interacts with your specific post*/}leashane13 </span>and 
                                <span>{/** if likes display the number of likes, if comments display the number of comments  */} 23</span> 
                                <span> other people {/**if there is only one comment or like hide this */}</span>
                                <span>{/**like or comment*/}like </span> your post.
                            </p>
                            <div className='w-[10%]'>
                                <h6 className='text-[0.5rem] text-gray-500 '>2 min</h6>
                            </div>
                        </div>
                    </Link>
                    )}
                    </Menu.Item>          
                    <Menu.Item key="" as={Fragment}>
                    {({ active }) => (
                    <Link
                    href={'/'}
                    className={`${
                        active ? 'bg-[#F0EEF6] text-white px-3' : 'bg-white px-3 text-black'
                    } border-b border-black`}
                    >
                        <div className='flex gap-3 h-[4rem] justify-between items-center text-gray-400'>
                            <div className='w-[2rem]'>
                                <Image src={DisplayPhoto} alt=''/>
                            </div>
                            {/**latest interactions to your post */}                
                            <p className='w-[80%]'>
                                <span className='font-bold text-black'>{/**latest user that interacts with your specific post*/}leashane13 </span>and 
                                <span>{/** if likes display the number of likes, if comments display the number of comments  */} 23</span> 
                                <span> other people {/**if there is only one comment or like hide this */}</span>
                                <span>{/**like or comment*/}like </span> your post.
                            </p>
                            <div className='w-[10%]'>
                                <h6 className='text-[0.5rem] text-gray-500 '>2 min</h6>
                            </div>
                        </div>
                    </Link>
                    )}
                    </Menu.Item>          
                    <Menu.Item key="" as={Fragment}>
                    {({ active }) => (
                    <Link
                    href={'/'}
                    className={`${
                        active ? 'bg-[#F0EEF6] text-white px-3' : 'bg-white px-3 text-black'
                    } border-b border-black`}
                    >
                        <div className='flex gap-3 h-[4rem] justify-between items-center text-gray-400'>
                            <div className='w-[2rem]'>
                                <Image src={DisplayPhoto} alt=''/>
                            </div>
                            {/**latest interactions to your post */}                
                            <p className='w-[80%]'>
                                <span className='font-bold text-black'>{/**latest user that interacts with your specific post*/}leashane13 </span>and 
                                <span>{/** if likes display the number of likes, if comments display the number of comments  */} 23</span> 
                                <span> other people {/**if there is only one comment or like hide this */}</span>
                                <span>{/**like or comment*/}like </span> your post.
                            </p>
                            <div className='w-[10%]'>
                                <h6 className='text-[0.5rem] text-gray-500 '>2 min</h6>
                            </div>
                        </div>
                    </Link>
                    )}
                    </Menu.Item>          
                </Menu.Items>
            </Transition>
        </Menu>  
    </div>
  )
}
