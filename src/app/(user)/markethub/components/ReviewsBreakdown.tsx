'use client'
import { Reviews } from '@/lib/types'
import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

function ReviewsBreakdown({
    productReviews,
}: {
    productReviews: Reviews[]
}) {
    const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    useEffect(() => {
        // Count the occurrences of each rating
        const counts: { [key: number]: number } = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };
        productReviews.forEach(review => {
            const rating = Math.round(review.overAllRating); // Round to nearest integer
            counts[rating] = (counts[rating] || 0) + 1;
        });
        setRatingCounts(counts);
    }, [productReviews]);

    return (
        <div className="col-span-4 px-5 border-2 border-black">
            <h1 className='text-center text-lg font-poppins font-semibold'>Ratings Breakdown</h1>
            <div className='flex  flex-col-reverse gap-y-4'>            
                {Object.entries(ratingCounts).map(([rating, count]) => (
                <div key={rating} className='flex items-center'>
                    <h1 className='w-[5%] text-lg font-semibold'>{rating}</h1>
                    <Star fill='#F7C35F' color='#F7C35F'/>
                    <Progress value={(count / productReviews.length) * 100} className='h-5 w-[70%]'/>
                    <h3 className='w-[15%] text-right'>{(count / productReviews.length) * 100}%</h3>
                </div>
                ))}
            </div>

        </div>
    );
}

export default ReviewsBreakdown;
