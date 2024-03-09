import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { PostSchema } from "@/lib/validations/createPostSchema";
import { z } from "zod";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { NextApiRequest, NextApiResponse } from "next";

//Getting all post
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const {searchParams} = new URL(req.url);
        const param = searchParams.get("cursor");
        const limit = 5
        const getAllPost = await prisma.post.findMany({
           cursor: param ?{
            id:param
           }: undefined,
           take: limit,
           skip: param === '' ? 0 : 1,
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
        return new Response(JSON.stringify({getAllPost, nextId: myCursor}))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    
//Creating new post
export async function POST(req: Request) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        const body = await req.json()
        const { title, content, topicId } = PostSchema.parse(body)
        await prisma.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                topicId
            }
        })
        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid POST request data passed', { status: 422 })
        }
        return new Response('Could not post to community at this time, please try again later', { status: 500 })
    }
}

//Deleteng Post
export async function DELETE(req: NextRequest) {
    
}

export async function HEAD(req: NextRequest) {

}