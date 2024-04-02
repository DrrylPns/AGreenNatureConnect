'use client'
import { ThumbsUp } from 'lucide-react'
import React, { startTransition, useEffect, useState } from 'react'
import { likeReview } from '../../../../../actions/review';
import { toast } from '@/lib/hooks/use-toast';
import { Reviews } from '@/lib/types';
import { useSession } from 'next-auth/react';

function Helpful({review}:{review: Reviews}) {
    const [liked, setLiked] = useState(false);
    const {data:session} = useSession();
    const [reviewLength, setReviewLength] = useState<number>(review.like.length)

    const userLiked = review ? review.like.some(like => like.userId === session?.user.id) : false;

    useEffect(()=>{
        userLiked && setLiked(true)
    },[userLiked])

    const handleLike = async (reviewId: string) => {
        setLiked(!liked);
        startTransition(() => {
            likeReview(reviewId).then((callback) => {
                if (callback?.error) {
                    toast({
                        description: `${callback.error}`,
                        variant: "destructive"
                    })
                }

                if (callback?.success) {
                    liked ? setReviewLength(reviewLength - 1) : setReviewLength(reviewLength + 1) 
                    toast({
                        description: `${callback.success}`
                    })
                }
            });
            
        });
    }

   
  return (
    <div className='flex text-xs items-center gap-1'>
         <span className='text-xs'>Helpful</span> 
         <ThumbsUp onClick={()=>handleLike(review.id)} height={20} width={20} fill={liked ? '#F7C35F' : 'white' } />
         <span className='text-xs'>({reviewLength})</span> 
    </div>
  )
}

export default Helpful