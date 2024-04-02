'use client'
import { Reviews } from '@/lib/types';
import React, { startTransition, useEffect, useState } from 'react';
import { RatingStars } from './Rating';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { dislikeReview, likeReview } from '../../../../../actions/review';
import { toast } from '@/lib/hooks/use-toast';
import ReviewImage from './ReviewImage';
import Image from 'next/image';
import RelativeDate from '@/app/components/RelativeDate';
import Helpful from './Helpful';

const RatingLabels: { [key: number]: string } = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Fair',
    4: 'Good',
    5: 'Excellent',
};
function MostLikeReview({
    productReviews,
}: {
    productReviews: Reviews[];
}) {
    // Find the review with the highest number of likes
    const mostLikedReview = productReviews.reduce((prevReview, currentReview) => {
        return currentReview.like.length > prevReview.like.length ? currentReview : prevReview;
    }, productReviews[0]);

    return (
        <div className='flex flex-col border-2 border-black col-span-5 min-h-60 px-4 bg-slate-100 drop-shadow-md rounded-md'>
            <h1 className='text-center text-lg font-poppins font-semibold'>Most Helpful Review</h1>
            <div className='flex gap-5 px-2'>  
                {mostLikedReview && mostLikedReview.like.length > 0 ? (
                    <div>
                        <div className='flex gap-3 items-center'>
                            <div className='w-10 h-10 rounded-full'>
                                <Image 
                                    src={mostLikedReview.User.image || ''}
                                    alt=''
                                    width={100}
                                    height={100}
                                    className='object-cover w-full rounded-full'
                                />  
                            </div>
                            <div className='text-xs font-poppins text-gray-500'>
                                <h1 className='font-semibold text-black'>{mostLikedReview.User.username}</h1>
                                <h3 className='text-[0.6rem]'> <RelativeDate dateString={mostLikedReview.createdAt.toString()}/></h3>
                            </div>
                            {mostLikedReview.image !== null ? (
                                <div className='w-20 ml-auto border border-gray-100 shadow-md drop-shadow-md h-20 rounded-md'>
                                    <Image 
                                        src={mostLikedReview.image || ''}
                                        alt=''
                                        width={100}
                                        height={100}
                                        className='object-cover w-full rounded-md'
                                    />  
                                </div>
                            ):(
                                <></>
                            )}
                            
                        </div>
                        <RatingStars width={100} readonly={true} average={mostLikedReview.overAllRating} />
                            <div className='flex gap-x-3 text-[0.6rem] w-full text-gray-400 mt-2'>
                                <span>Price: <span className="text-gray-700">{RatingLabels[mostLikedReview.priceRating]}</span></span>
                                <span>Quality: <span className="text-gray-700">{RatingLabels[mostLikedReview.qualityRating]}</span></span>
                                <span>Freshness: <span className="text-gray-700">{RatingLabels[mostLikedReview.freshnessRating]}</span></span>
                                <span>Service: <span className="text-gray-700">{RatingLabels[mostLikedReview.serviceRating]}</span></span>
                            </div>
                        <p className='text-sm font-semibold font-poppins'>{mostLikedReview.title}</p>
                        <p className='line-clamp-6 text-xs '>{mostLikedReview.description}</p>
                        <div className='flex w-full items-center justify-end mt-4'>
                            <Helpful review={mostLikedReview}/>
                        </div>
                    </div>
                ) : (
                    <div className='w-full my-auto flex justify-center items-center border border-black'>
                        <p>No review yet!</p>
                    </div>
                )}
            </div>
           
        </div>
    );
} 

export default MostLikeReview;
