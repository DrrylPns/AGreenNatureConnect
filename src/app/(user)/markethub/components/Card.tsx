'use client'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Image from 'next/image';
import { RatingStars } from './Rating';
import Link from 'next/link';

interface Reviews {
    id:     string
    image: string | null
    priceRating:  number
    qualityRating:  number
    serviceRating:  number
    freshnessRating: number
    overAllRating:  number
    title: string
    description: string | null
    createdAt: Date         
    updatedAt: Date           
    productId: string
    userId: string
  }

function Card({
    imageUrl,
    productName,
    barangay,
    lowestPrice,
    highestPrice,
    productReviews,
    productId,
}:{
    imageUrl: string,
    productName: string,
    barangay:string,
    lowestPrice: number,
    highestPrice: number,
    productReviews: Reviews[],
    productId: string
}) {
    
    let sumOfRatings = 0;
    let totalNumberOfRatings = 0;
    productReviews && productReviews.length > 0 && productReviews.forEach(review => {
        sumOfRatings += review.overAllRating;
        totalNumberOfRatings++;
    });

    const ratingsAverage = productReviews && productReviews?.length > 0 ? sumOfRatings / totalNumberOfRatings : 0
        
    
  return (
    <div className='bg-slate-100 h-fit dark:text-black hover:shadow-xl transition-all duration-300 ease-in-out pb-3 shadow-md drop-shadow-md rounded-sm w-full border border-gray-300'>
        <div className='bg-gray-50 w-full max-h-1/2'>
        <Image 
            src={imageUrl} 
            alt={productName}
            width={100}
            height={300}
            className='h h-40 w-full object-contain mb-3 border-b-[2px] border-gray-300' 
        />
        </div>
        {/**Product Name */}
        <div className='text-center w-full'>
            <h1 className='font-poppins font-bold text-lg '>{productName}</h1>
            <h3 className='text-sm sm:text-sm font-poppins font-normal'>{barangay}</h3>
            {productReviews.length > 0 ?(
                <Link href={`/markethub/reviews/${productId}`} className="flex z-30 items-center justify-around my-2 px-2 gap-2 w-full relative rounded-xl overflow-hidden dark:bg-slate-800/25">
                    {productReviews.length > 0 && (
                        <RatingStars readonly={true} average={ratingsAverage} width={100}/>
                    )}
                    
                    <h1 className="text-sm  text-gray-600 dark:text-gray-300">{productReviews?.length} Reviews</h1>
                </Link>
            ):(
                <h1 className="text-sm  text-gray-600 dark:text-gray-300">{productReviews?.length} Reviews</h1>
            )}            
           
        </div>
        {lowestPrice == 0 && highestPrice == 0 ?(
            <div className='flex justify-between p-3 border-t-2 border-gray  px-3 '>
                <span className='text-xs sm:text-xs md:text-xs font-poppins'>Price:</span>
                <span className='text-xs sm:text-xs md:text-xs font-poppins'>Free</span>
            </div>
        ):(
            <div className='flex justify-between items-center border-t-2 border-gray pt-3 px-3'>
                <span className='text-[0.55rem] sm:text-xs md:text-[0.6rem] font-poppins font-bold'>Price:</span>
                <span className='text-[0.55rem] sm:text-xs md:text-[0.6rem] font-poppins font-bold border border-black rounded-xl px-2 py-1'>₱ {lowestPrice} - ₱ {highestPrice}</span>
            </div>
        )}
        
    </div>
  )
}

export default Card