import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";
import { getAuthSession } from "../../../../lib/auth";
import { PostSchema } from "@/lib/validations/createPostSchema";
import { EnumValues, z } from "zod";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { NextApiRequest, NextApiResponse } from "next";
import { ReactionType } from "@prisma/client";

//Getting all post
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const filter = searchParams.get("filter");
        const param = searchParams.get("cursor");
        const limit = 5
        if(filter === "none"){
            const getAllPost = await prisma.post.findMany({
                cursor: param ? {
                    id: param
                } : undefined,
                take: limit,
                skip: param === '' ? 0 : 1,
                include: {
                    author: true,
                    comments: {
                        include: {
                            author: true,
                            replyOnComent: true
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
        } else {
            const getAllPost = await prisma.post.findMany({
                cursor: param ? {
                    id: param
                } : undefined,
                take: limit,
                skip: param === '' ? 0 : 1,
                where:{
                    reactions:{
                        some:{
                            userId: userId as string,
                            type: filter as ReactionType,
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
        }
       
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