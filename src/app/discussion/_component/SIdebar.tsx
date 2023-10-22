'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BiMenu,
  BiArrowBack,
  BiHome,
  BiStore,
  BiInfoCircle,
} from "react-icons/bi"
import { PiUsersThree, PiCaretDown } from 'react-icons/pi'
import { AiOutlineQuestionCircle, AiOutlineFileProtect } from 'react-icons/ai'
import { LuFileSignature } from 'react-icons/lu'
import Link from 'next/link';

export default function SIdebar({
  toggled,
  toggleSidebar,
}: {
  toggled: boolean;
  toggleSidebar: () => void;
}) {


  console.log(toggled)
  return (
    <motion.div
      initial={{ width: '5%' }} // Initial width when sidebar is open
      animate={{ width: toggled ? '20%' : '5%' }} // Animate width to 0 when collapsed
      transition={{ duration: 0.5 }}
      className='fixed bg-[#F0EEF6] h-full min-w-min z-0 border-t-4 border-gray-200 shadow-md drop-shadow-lg'
    >
      <button onClick={toggleSidebar} className='w-full transition-all ease-in duration-100'>
        {toggled ? (
          <div className='flex flex-col items-end w-full mt-24 px-5 font-bold text-[2rem] text-gray-700'>
            {/* <BiArrowBack /> comment out temporarily*/}
            {/*<div className='flex flex-col text-[1.5rem] w-full gap-2 items-start'>
              <Link href={'/discussion'} className='flex justify-start items-center gap-2 w-full hover:bg-pale'>
                <BiHome />
                <p className='font-poppins font-medium'>Home</p>
              </Link>
              <div className='flex justify-between items-center gap-2 w-full'>
                <PiUsersThree />
                <p className='font-poppins font-medium'>Communities</p>
                <PiCaretDown/>
              </div>
              <Link href={'/discussion'} className='flex justify-start items-center gap-2 w-full hover:bg-pale'>
                <BiStore/>
                <p className='font-poppins font-medium'>MarketPlace</p>
              </Link>
      </div>*/}
          </div>
        ) : (
          <div className='flex flex-col items-center w-full mt-24 font-bold text-[2rem]'>
            <BiMenu />
            {/*<div className='flex flex-col text-[1.5rem] w-full gap-2 items-center'>
              <BiHome />
              <PiUsersThree />
              <BiStore/>
        </div>*/}
          </div>
        )}
      </button>
      {/**Home, Communities, Marketplace Icons and links */}
      <div className='border-b border-gray-600'>
        <div className='flex flex-col text-[1.5rem] w-full gap-2 items-start'>
          <Link href={'/discussion'} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
            <div className='flex items-center gap-2 '>
              <BiHome />
              <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>Home</p>
            </div>
          </Link>
          <button type='button' className='flex justify-between items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
            <div className='flex items-center gap-2'>
              <PiUsersThree />
              <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>Communities</p>
            </div>
            <div className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <PiCaretDown />
            </div>
          </button>
          <Link href={'/discussion'} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
            <div className='flex items-center gap-2 '>
              <BiStore />
              <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'} `}>MarketPlace</p>
            </div>
          </Link>
        </div>
      </div>
      <div className='flex flex-col text-[1.5rem] w-full gap-2 items-start mt-2'>
        <Link href={''} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
          <div className='flex items-center gap-2 '>
            <BiInfoCircle />
            <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>About</p>
          </div>
        </Link>
        <Link href={''} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
          <div className='flex items-center gap-2 '>
            <AiOutlineQuestionCircle />
            <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>Help</p>
          </div>
        </Link>
        <Link href={''} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
          <div className='flex items-center gap-2 '>
            <AiOutlineFileProtect />
            <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block' : 'opacity-0 hidden'}`}>Privacy Policy</p>
          </div>
        </Link>
        <Link href={''} className='flex items-center w-full mb-2 py-1 hover:bg-pale transition-all duration-100 ease-in-out px-5'>
          <div className='flex items-center gap-2 '>
            <LuFileSignature />
            <p className={`font-poppins text-[1rem] ${toggled ? 'opacity-100 block transition duration-300 delay-500' : 'opacity-0 hidden'}`}>User Agreement</p>
          </div>
        </Link>




      </div>

    </motion.div>
  );
}
