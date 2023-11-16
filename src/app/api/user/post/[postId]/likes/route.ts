import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { CommentSchema } from "@/lib/validations/createCommentSchema";
import { LikeSchema } from "@/lib/validations/createLikeSchema";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";


export async function GET(req: NextRequest) {
    const postIdWithLikes = req.url.split("post/")[1];
    const postId = postIdWithLikes.replace("/likes", "")
    try {
        const getTheNumberOfLikes = await prisma.like.count({
            where:{
                postId: postId
            }
        })


        return new Response(JSON.stringify(getTheNumberOfLikes), {status: 200})
    } catch (error) {
        
    }
}

//Creating new post
export async function POST(req: NextRequest) {
    const path = req.nextUrl.pathname
    console.log(path)
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        const body = await req.json()
        const { postId } = LikeSchema.parse(body)
        const userId = session.user.id

        const getAllLikes = await prisma.like.findFirst({
            where:{
                postId: postId,
                userId: userId
            }
        })

        if(getAllLikes){
            await prisma.like.delete({
               where:{ 
                userId_postId:{
                    postId: postId,
                    userId: userId
                }
               }
            })

            return new Response('Unliked')
        }

        await prisma.like.create({
            data:{
                userId: userId,
                postId: postId,
            }
        })
        revalidatePath(`/api/user/post/${postId}/likes`)
        return new Response('Liked')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid POST request data passed', { status: 422 })
        }
        return new Response('Could not like the post at this time, please try again later', { status: 500 })
    }
}

