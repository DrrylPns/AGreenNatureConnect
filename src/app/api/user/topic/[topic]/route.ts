import prisma from '../../../../../lib/db/db'
import { NextRequest } from "next/server";


//Getting all 
export async function GET(req: NextRequest) {
    const topicName = req.nextUrl.pathname.split("topic/")[1].replace(/-/g, ' ');
    try {
        const getTopicByName = await prisma.topic.findUnique({
            where:{
                name: topicName
            },
            include:{
                posts: {
                    include:{
                        author: true,
                        comments: true,
                        likes: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
         
        })

        if(!getTopicByName){
            return new Response(JSON.stringify('No post created yet in this topic'), {status: 200})
        }
        return new Response(JSON.stringify(getTopicByName), {status: 200})
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