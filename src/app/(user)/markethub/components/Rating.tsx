'use client'
import React, { useState } from 'react'

import { Rating as ReactRating, Star } from '@smastrom/react-rating'
import Rate from 'rc-rate';

interface Reviews {
    id:     string
    rating:  number
    title: string
    description: string | null
    createdAt: Date         
    updatedAt: Date           
    productId: string
    userId: string
  }

interface RatingStarsProps {
    readonly: boolean
    average?: number
    width: number,
    onChange?: () => void;
  }

const myStyles = {
    itemShapes: Star,
    activeFillColor: '#F7C35F',
    inactiveFillColor: '#2C2C2A'
}

export function RatingStars({readonly, average, width, onChange}: RatingStarsProps) {
    const [rating, setRating] = useState(average || 0)    
    
  return (
    <div className="flex flex-row items-center">
       <ReactRating style={{ maxWidth: width, }} itemStyles={myStyles} value={rating} onChange={setRating} readOnly={readonly} halfFillMode='svg' />
    </div>
  )
}