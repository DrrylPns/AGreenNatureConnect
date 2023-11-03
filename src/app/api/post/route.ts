import prisma from "@/lib/db/db"
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";


//Getting all post
export async function GET(req: NextRequest) {
    try {
        const getAllPost = await prisma.post.findMany({
            include:{
                author: true,
                comments:true,
                likes: true,
                Topic: {
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
export async function POST(req: NextRequest){
    
}

//Deleteng new Post
export async function DELETE(req: NextRequest){

}

export async function HEAD(req: NextRequest){

}