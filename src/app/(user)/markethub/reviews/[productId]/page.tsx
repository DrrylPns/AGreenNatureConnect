import React from 'react'
import Back from '../../components/Back'
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import prisma from '@/lib/db/db'
import { RatingStars } from '../../components/Rating'
import ReviewsAverage from '../../components/ReviewsAverage'
import ReviewsBreakdown from '../../components/ReviewsBreakdown'
import MostLikeReview from '../../components/MostLikeReview'

import ReviewImage from '../../components/ReviewImage'
import ReviewContainer from '../../components/ReviewContainer'


async function page({
    params
}:{
    params:{
        productId: string
    }
}) {
    const product = await prisma.product.findUnique({
        where:{
            id: params.productId
        }
    })

    const productReviews = await prisma.review.findMany({
        where:{
            productId: params.productId
        },
        include:{
            User:true,
            product: true,
            like:{
                include:{
                    user:true
                }
            },
            dislike:{
                include:{
                    user:true
                }
            }
        }
      
    })
    

  return (
    <div>
        <Back/>
        <div className='flex items-center text-4xl font-poppins font-bold mb-5'>
            <Star size={50} color='#F7C35F' fill='#F7C35F' className='mr-5'/>
            <h1> Product Review Display!</h1>
            
        </div>
       <div className='grid grid-cols-12 gap-5'>
            <ReviewsAverage productReviews={productReviews} />
            <ReviewsBreakdown productReviews={productReviews} />
            <MostLikeReview productReviews={productReviews} />
       </div>
       <h1 className='my-5 text-2xl font-semibold'>Other Reviews</h1>
       <div>
            <ReviewContainer productId={params.productId}/>
       </div>
    </div>
  )
}

export default page