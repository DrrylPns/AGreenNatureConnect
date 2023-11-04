import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";
import {INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'


//Getting all 
export async function GET(req: NextRequest) {
    try {

        const getAllTopicWithPagination = await prisma.topic.findMany({
           orderBy:{
            name: 'asc'
           }
        })
        return new Response(JSON.stringify(getAllTopicWithPagination), {status: 200})
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