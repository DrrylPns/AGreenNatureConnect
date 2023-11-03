import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { PostSchema } from "@/lib/validations/createPostSchema";
import { z } from "zod";

//Getting all post
export async function GET(req: NextRequest) {
    try {
        const getAllPost = await prisma.post.findMany({
            include:{
                author: true,
                comments:true,
                likes: true,
                topic: {
                   select:{
                    name:true
                   }
                }
            }
        })
        return new Response(JSON.stringify(getAllPost))
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
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

//Deleteng new Post
export async function DELETE(req: NextRequest){

}

export async function HEAD(req: NextRequest){

}