import prisma from '../../../../../lib/db/db'
import { NextRequest } from "next/server";


//Getting all 
export async function GET(req: NextRequest) {
    const url = req.nextUrl.pathname;
    const decodeUrl = decodeURIComponent(url)
    const topicName = decodeUrl.split("topic/")[1]
    try {
        const getTopicByName = await prisma.topic.findUnique({
            where:{
                name: topicName
            },
            include:{
                posts: {
                    include:{
                        author: true,
                        comments: {
                            include:{
                                replyOnComent: true
                            }
                        },
                        likes: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
         
        })

      
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