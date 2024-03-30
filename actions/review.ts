"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { revalidatePath } from "next/cache"

export const likeReview = async(reviewId:string)=>{
    try {
        const session = await getAuthSession()
        if (!session) return { error: "Unauthorized" }
        const findLike = await prisma.reviewLike.findFirst({
            where:{
                userId: session.user.id,
                reviewId
            }
        })
        if(findLike){
            await prisma.reviewLike.delete({
                where:{
                    id: findLike.id
                }
            })
            return { success: "Successfully remove your Like in a review!" }
        } else {
            const findDislike = await prisma.reviewDislike.findFirst({
                where:{
                    userId: session.user.id,
                    reviewId
                }
            })
            if(findDislike){
                await prisma.reviewDislike.delete({
                    where:{
                        id: findDislike.id
                    }
                })
            }
            await prisma.reviewLike.create({
                data:{
                    userId: session.user.id,
                    reviewId
                }
            })
            return { success: "Successfully Like a review!" }
        }
       
    } catch (error) {
        return { error: error }
    }
}

export const dislikeReview = async(reviewId:string)=>{
    try {
        const session = await getAuthSession()
        if (!session) return { error: "Unauthorized" }

        const findDislike = await prisma.reviewDislike.findFirst({
            where:{
                userId: session.user.id,
                reviewId
            }
        })
        
        if(findDislike){
            await prisma.reviewDislike.delete({
                where:{
                    id: findDislike.id
                }
            })
            return { success: "Successfully remove your Dislike in a review!" }
        } else {
            const findLike = await prisma.reviewLike.findFirst({
                where:{
                    userId: session.user.id,
                    reviewId
                }
            })
            if(findLike){
                await prisma.reviewDislike.delete({
                    where:{
                        id: findLike.id
                    }
                })
            }
            await prisma.reviewDislike.create({
                data:{
                    userId: session.user.id,
                    reviewId
                }
            })
            return { success: "Successfully Dislike a review!" }
        }
       
       
    } catch (error) {
        return { error: error }
    }
}