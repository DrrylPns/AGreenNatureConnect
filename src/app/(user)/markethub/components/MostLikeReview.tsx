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
    const { data: session } = useSession();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    // Find the review with the highest number of likes
    const mostLikedReview = productReviews.reduce((prevReview, currentReview) => {
        return currentReview.like.length > prevReview.like.length ? currentReview : prevReview;
    }, productReviews[0]);

    const userLiked = mostLikedReview ? mostLikedReview.like.some(like => like.userId === session?.user.id) : false;
    const userDisliked = mostLikedReview ? mostLikedReview.dislike.some(dislike => dislike.userId === session?.user.id) : false;

    useEffect(()=>{
        userLiked && setLiked(true)
        userDisliked && setDisliked(true)
    },[userLiked,userDisliked])

    const handleLike = async () => {
        setLiked(!liked);
        setDisliked(false)
        startTransition(() => {
            likeReview(mostLikedReview.id).then((callback) => {
                if (callback?.error) {
                    toast({
                        description: `${callback.error}`,
                        variant: "destructive"
                    })
                }

                if (callback?.success) {
                    toast({
                        description: `${callback.success}`
                    })
                }
            });
            
        });
    }

    const handleDislike = async () => {
        setLiked(false);
        setDisliked(!disliked)
        startTransition(() => {
            dislikeReview(mostLikedReview.id).then((callback) => {
                if (callback?.error) {
                    toast({
                        description: `${callback.error}`,
                        variant: "destructive"
                    })
                }

                if (callback?.success) {
                    toast({
                        description: `${callback.success}`
                    })
                }
            });
            
        });
    }

    return (
        <div className='flex flex-col justify-between border-2 border-black col-span-5 min-h-60 px-4 bg-slate-100 drop-shadow-md rounded-md'>
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

                    </div>
                ) : (
                    <p>No reviews yet!</p>
                )}
            </div>
            <div className='flex w-full items-center justify-end gap-2 mt-4'>
                <span className='text-xs'>Helpful</span> <ThumbsUp onClick={handleLike} fill={liked ? '#F7C35F' : 'white' } />
                <span className='text-xs'>Not helpful</span><ThumbsDown onClick={handleDislike} fill={disliked ? '#F7C35F' : 'white'} />
            </div>
        </div>
    );
}

export default MostLikeReview;
