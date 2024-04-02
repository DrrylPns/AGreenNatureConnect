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
    <div className='col-span-3 flex flex-col justify-center items-center text-center text-lg font-poppins font-semibold border border-black'>
        <Image
            src={productImage}
            alt='Image'
            width={200}
            height={200}
            className='o object-cover'
        />
        <h1>{productName}</h1>
        <h1>Overall Rating</h1>
        <h1>{ratingsAverage} / 5</h1>
        <RatingStars width={150} readonly={true} average={ratingsAverage} />
    </div>
  )
}
export default ReviewsAverage