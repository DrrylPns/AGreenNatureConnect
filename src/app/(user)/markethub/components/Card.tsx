import React from 'react'

import Image, { StaticImageData } from 'next/image';

function Card({
    imageUrl,
    productName,
    barangay,
    lowestPrice,
    highestPrice
}:{
    imageUrl: string,
    productName: string,
    barangay:string,
    lowestPrice: number,
    highestPrice: number
}) {
  return (
    <div className='bg-slate-100  dark:text-black hover:shadow-xl transition-all duration-300 ease-in-out pb-3 max-h-72 shadow-md drop-shadow-md rounded-sm h-fit w-full border border-gray-300'>
        {/** */}
        <Image 
            src={imageUrl} 
            alt={productName}
            width={100}
            height={100}
            className='w-full object-scale-down max-h-[50%] h-1/2 mb-3 border-b-[2px] border-gray-300' 
        />
        {/**Product Name */}
        <div className='px-3'>
            <h1 className='font-poppins font-semibold text-xs '>{productName}</h1>
            {/**Barangay */}
            <h3 className='text-[0.5rem] sm:text-xs font-poppins font-normal'>{barangay}</h3>
        </div>
        {lowestPrice == 0 && highestPrice == 0 ?(
            <div className='flex justify-between p-3 border-t-2 border-gray mt-5 px-3 '>
                <span className='text-xs sm:text-xs md:text-xs font-poppins'>Price:</span>
                <span className='text-xs sm:text-xs md:text-xs font-poppins'>Free</span>
            </div>
        ):(
            <div className='flex justify-between items-center p-3 border-t-2 border-gray mt-5 px-3'>
                <span className='text-[0.55rem] sm:text-xs md:text-[0.6rem] font-poppins font-bold'>Price:</span>
                <span className='text-[0.55rem] sm:text-xs md:text-[0.6rem] font-poppins font-bold border border-black rounded-xl px-2 py-1'>₱ {lowestPrice} - ₱ {highestPrice}</span>
            </div>
        )}
        
    </div>
  )
}

export default Card