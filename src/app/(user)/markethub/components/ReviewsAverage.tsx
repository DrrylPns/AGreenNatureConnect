import React from 'react'
import { RatingStars } from './Rating'
import {  Reviews } from '@/lib/types'
import Image from 'next/image';


function ReviewsAverage({
    productReviews,
    productName,
    productImage
}:{
    productReviews: Reviews[],
    productName: string,
    productImage: string
}) {
    let sumOfRatings = 0;
    let totalNumberOfRatings = 0;
    productReviews && productReviews.length > 0 && productReviews.forEach(review => {
        sumOfRatings += review.overAllRating;
        totalNumberOfRatings++;
    });

    const ratingsAverage = productReviews && productReviews?.length > 0 ? sumOfRatings / totalNumberOfRatings : 0
        
    
  return (
    <div className='col-span-12 md:col-span-3 flex flex-col justify-center items-center text-center text-lg font-poppins font-semibold border border-black'>
        <div className=' relative shadow-md drop-shadow-md mb-3 w-24 h-24'>
            <Image
                src={productImage}
                alt='Image'
                width={100}
                height={100}
                className='object-contain w-full h-full'
            />
        </div>
        <h1 className='text-xs md:text-sm'>{productName}</h1>
        <h1 className='text-xs md:text-sm'>Overall Rating</h1>
        <h1 className='text-xs md:text-sm'>{ratingsAverage} / 5</h1>
        <RatingStars width={100} readonly={true} average={ratingsAverage} />
    </div>
  )
}
export default ReviewsAverage