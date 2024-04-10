import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { ReviewSchema } from "@/lib/validations/addReviewSchema";
import { PaymentGcashSchema } from "@/lib/validations/paymentGcashSchema";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session) { return new Response('Unauthorized', { status: 401 }) }

        const body = await req.json();
        const {
            description,
            freshnessRating,
            overAllRating,
            priceRating,
            productId,
            qualityRating,
            serviceRating,
            title,
            image,
            transactionId,
        } = ReviewSchema.parse(body);

        const prevRating = await prisma.review.findFirst({
            where:{
                productId,
                userId: session.user.id,
                transactionId
                
            }
        })
        
        if(!prevRating){
            await prisma.review.create({
                data: {
                    freshnessRating,
                    image,
                    overAllRating,
                    priceRating,
                    qualityRating,
                    serviceRating,
                    title,
                    description,
                    productId,
                    userId: session.user.id,
                    transactionId
                },
            })
            return new Response('Successfully reviewed the product!')
        } else {
            return new Response("Not allowed!")
        }

    
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(`Invalid POST request data passed: ${error}`, { status: 422 })
        }
        console.log(error)
        return new Response('Could not update receipt at this time, please try again later', { status: 500 })
    }
}