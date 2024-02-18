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
    <div className='bg-[] dark:text-black hover:shadow-xl transition-all duration-300 ease-in-out bg-white  pb-3 max-h-72 shadow-md drop-shadow-md rounded-lg h-fit w-full border border-gray-300'>
        {/** */}
        <Image 
            src={imageUrl} 
            alt={productName}
            width={100}
            height={100}
            className='w-full h-1/2 mb-3 border-b-[2px] border-gray-300' 
        />
        {/**Product Name */}
        <div className='px-3'>
            <h1 className='font-poppins font-semibold '>{productName}</h1>
            {/**Barangay */}
            <h3 className='text-sm font-poppins font-normal'>{barangay}</h3>
        </div>
        {lowestPrice == 0 && highestPrice == 0 ?(
            <div className='flex justify-between p-3 border-t-2 border-gray mt-5 px-3 '>
                <span className='text-sm md:text-xs font-poppins'>Price:</span>
                <span className='text-sm md:text-xs font-poppins'>Free</span>
            </div>
        ):(
            <div className='flex justify-between p-3 border-t-2 border-gray mt-5 px-3'>
                <span className='text-sm md:text-xs font-poppins'>Price:</span>
                <span className='text-sm md:text-xs font-poppins'>₱ {lowestPrice} - ₱ {highestPrice}</span>
            </div>
        )}
        
    </div>
  )
}

export default Card