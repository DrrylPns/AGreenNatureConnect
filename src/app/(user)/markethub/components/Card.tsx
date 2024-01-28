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
    <div className='bg-white shadow-md drop-shadow-md rounded-lg h-full w-full'>
        {/** */}
        <Image 
            src={imageUrl} 
            alt='Pechay'
            width={100}
            height={100}
            className='w-full h-1/2 object-contain mb-3' 
        />
        {/**Product Name */}
        <div className='px-3'>
            <h1 className='font-poppins font-semibold '>{productName}</h1>
            {/**Barangay */}
            <h3 className='text-sm font-poppins font-normal'>{barangay}</h3>
        </div>
        <div className='flex justify-between p-3 border-t-2 border-gray mt-10 px-3'>
            <span className='text-sm font-poppins'>Price</span>
            <span className='text-sm font-poppins'>Php {lowestPrice} - Php {highestPrice}</span>
        </div>
    </div>
  )
}

export default Card