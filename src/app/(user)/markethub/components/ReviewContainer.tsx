'use client'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import ReviewImage from './ReviewImage'
import { Reviews } from '@/lib/types'
import { RatingStars } from './Rating'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import { ThumbsUp } from 'lucide-react'
import { likeReview } from '../../../../../actions/review'
import { toast } from '@/lib/hooks/use-toast'
import Helpful from './Helpful'

type ReviewProps = {
    getAllReviews: Reviews[];
    nextId: string;
    userId: string;
  };

  const RatingLabels: { [key: number]: string } = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Fair',
    4: 'Good',
    5: 'Excellent',
};

function ReviewContainer({
    productId
}:{
    productId: string
}) {

    const pref = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
        fetchNextPage();
        }
    }, [inView]);

    const {
        isLoading,
        isError,
        data: Reviews,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["reviews"],
        queryFn: async ({ pageParam = "" }) => {
        try {
            const { data } = await axios.post(`/api/markethub/review?cursor=${pageParam}`,{productId: productId});
            return data as ReviewProps;
        } catch (error: any) {
            throw new Error(`Error fetching post: ${error.message}`);
        }
        },
        getNextPageParam: (lastPage) => lastPage.nextId || undefined,
    });

    

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!</div>;
    
  return (
    <div className='flex w-full'>
        {Reviews.pages.map((page)=>(
            <div key={page.nextId} className='w-full'>
                {page.getAllReviews !== undefined && page.getAllReviews.map((review)=>(
                    <div className='shadow-md drop-shadow-md mb-2 bg-slate-100 p-4'>
                       
                        <div key={review.id} className='w-full flex mb-5 '>
                            <ReviewImage review={review}/>
                            <div className='font-poppins'>
                                <span className='flex text-gray-400'>Ratings :  <RatingStars readonly={true} average={review.overAllRating} width={100}/></span>
                                <div className='flex gap-x-10 text-gray-400'>
                                    <span>Price: <span className="text-gray-700">{RatingLabels[review.priceRating]}</span></span>
                                    <span>Quality: <span className="text-gray-700">{RatingLabels[review.qualityRating]}</span></span>
                                    <span>Freshness: <span className="text-gray-700">{RatingLabels[review.freshnessRating]}</span></span>
                                    <span>Service: <span className="text-gray-700">{RatingLabels[review.serviceRating]}</span></span>
                                </div>
                                <h1 className='font-semibold text-xl'>{review.title}</h1>
                                <p className='l line-clamp-4'>{review.description}</p>
                            </div>
                            {review.image !== null ? (
                                <div className='w-20 ml-auto border border-gray-100 shadow-md drop-shadow-md h-20 rounded-md'>
                                    <Image 
                                        src={review.image || ''}
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
                        <div className='w-full flex justify-end ml-auto text-right'>
                            <Helpful review={review}/>
                        </div>
                    </div>
                ))}
                {isFetchingNextPage && (
                <div className="transition-all text-center duration-500 ease-in-out animate-bounce">
                    Loading...
                </div>
                )}
                <span ref={ref} className="invisible absolute">
                    intersection observer marker
                </span>
            </div>
        ))}
    </div>
  )
}

export default ReviewContainer