import CheckAnimation from '@/app/components/CheckAnimation'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <div className='flex items-center justify-center w-full gap-x-14 md:gap-x-32'>
            <div>
                <CheckAnimation/>
            </div>
            <div>
                <h1 className='text-sm sm:text-lg md:text-[3rem] font-bold font-poppins'>Your order has been placed.</h1>
            </div>
        </div>
        <div className='flex items-center mt-24 justify-center w-full gap-x-20 md:gap-x-32 text-white'>
            <Link href={'/order-status'} className='text-center bg-yellow-400 px-5 py-4 rounded-lg w-1/3 md:w-1/5 font-poppins font-bold text-xs md:text-[1.5rem] hover:scale-105 transition-all ease-in duration-200'>Order Status</Link>
            <Link href={'/markethub'}className='text-center bg-green px-5 py-4 rounded-lg w-1/3 md:w-1/5 font-poppins font-bold text-xs md:text-[1.5rem] hover:scale-105 transition-all ease-in duration-200'>Home</Link>
        </div>
    </div>
  )
}

export default page