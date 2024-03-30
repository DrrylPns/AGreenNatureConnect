'use client'
import { Reviews } from '@/lib/types';
import React, { startTransition, useEffect, useState } from 'react';
import { RatingStars } from './Rating';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { dislikeReview, likeReview } from '../../../../../actions/review';
import { toast } from '@/lib/hooks/use-toast';
import ReviewImage from './ReviewImage';

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
        <div className='border-2 border-black col-span-5 min-h-60 px-4'>
            <h1 className='text-center text-lg font-poppins font-semibold'>Most Like Review</h1>
            <div className='flex gap-5 px-2'>
                <ReviewImage review={mostLikedReview}/>
                {mostLikedReview && mostLikedReview.like.length > 0 ? (
                    <div>
                        <RatingStars width={100} readonly={true} average={mostLikedReview.overAllRating} />
                        <p className='text-lg font-semibold font-poppins'>{mostLikedReview.title}</p>
                        <p className='line-clamp-6  h-28'>{mostLikedReview.description}</p>

                    </div>
                ) : (
                    <p>No reviews yet!</p>
                )}
            </div>
            <div className='flex w-full justify-end gap-5 mt-4'>
                <ThumbsUp onClick={handleLike} fill={liked ? '#F7C35F' : 'white' } />
                <ThumbsDown onClick={handleDislike} fill={disliked ? '#F7C35F' : 'white'} />
            </div>
        </div>
    );
}

export default MostLikeReview;
