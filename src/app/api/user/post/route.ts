import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";
import { getAuthSession } from "../../../../lib/auth";
import { PostSchema } from "@/lib/validations/createPostSchema";
import { z } from "zod";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { NextApiRequest, NextApiResponse } from "next";

//Getting all post
export async function POST(req: Request, res: NextApiResponse) {

    const { searchParams } = new URL(req.url);
    const {filter, userId} = await req.json()
    try {
        const param = searchParams.get("cursor");
        const limit = 5
        
        const getAllPost = await prisma.post.findMany({
            cursor: param ? {
                id: param
            } : undefined,
            take: limit,
            skip: param === '' ? 0 : 1,
            where:{
                reactions:{
                    some:{
                        userId: filter === "none"? undefined : userId,
                        type: filter === "none"? undefined : filter
                    },
                }
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                likes: true,
                topic: true
            },
            orderBy: { 
                createdAt: 'desc'
            },

        })
        const myCursor = getAllPost.length === limit ? getAllPost[getAllPost.length - 1].id : undefined;
        return new Response(JSON.stringify({ getAllPost, nextId: myCursor }))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}


// Deleting Post
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const postId = searchParams.get('postId')
    console.log(`this is your Id: ${postId}`)
    try {
        const deletePost = await prisma.post.delete({
            where: {
                id: postId as string
            }
        })


        console.log(deletePost)
        return new Response(JSON.stringify(deletePost), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}


export async function HEAD(req: NextRequest) {

}