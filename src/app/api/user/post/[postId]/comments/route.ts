import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";



//Getting all 
export async function GET(req: NextRequest) {
    const postIdWithComments = req.url.split("post/")[1];
    const postId = postIdWithComments.replace("/comments", "")
    try {
        const getAllCommentsByPostId = await prisma.comment.findMany({
            where:{
                postId: postId
            },
            include:{
                author: true,
                replies: true,
            }
        })
        if(getAllCommentsByPostId.length < 1){
            return new Response(JSON.stringify('There are no comments right now!'))
        }

        return new Response(JSON.stringify(getAllCommentsByPostId), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}

//Creating new post
export async function POST(req: NextRequest){

}

//Deleteng new Post
export async function DELETE(req: NextRequest){

}

export async function HEAD(req: NextRequest){

}