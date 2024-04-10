import RelativeDate from '@/app/components/RelativeDate'
import { Reviews } from '@/lib/types'
import DefaultImage from '@/../public/images/default-user.jpg';
import Image from 'next/image'
import React from 'react'

function ReviewImage({
    review
}:{
    review: Reviews
}) {
  return (
    <>
    {review && (
    <div className='flex flex-col justify-center items-center w-[20%]'>
        <div className='w-7 h-7 md:w-14 md:h-14 rounded-full ring-1 ring-black'>  
          <Image
              src={review.User.image || DefaultImage}
              alt={review.User.username || 'User Image'}
              width={70} height={70}
              className='object-cover w-full h-full rounded-full '
          />
        </div>
        <h1 className='font-semibold text-[0.6rem] md:text-lg font-poppins'>{review.User.username}</h1>
        <h1 className='text-[0.5rem] md:text-xs font-poppins font-medium'><RelativeDate dateString={review.createdAt.toString()} /></h1>
    </div>
    )}
    </>
  )
}

export default ReviewImage