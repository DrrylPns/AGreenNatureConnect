import prisma from "@/lib/db/db";
import { NextApiResponse } from "next";

//Getting all post
export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { searchParams } = new URL(req.url);
        const { productId } = await req.json()
        const param = searchParams.get("cursor");
        const limit = 5
        const getAllReviews = await prisma.review.findMany({
            cursor: param ? {
                id: param 
            } : undefined,
            take: limit,
            skip: param === '' ? 0 : 1,
            where:{
                productId
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
            },
            orderBy: {
                createdAt: 'desc'
            },

        })
        const myCursor = getAllReviews.length === limit ? getAllReviews[getAllReviews.length - 1].id : undefined;
        return new Response(JSON.stringify({ getAllReviews, nextId: myCursor }))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
