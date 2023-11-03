import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";



//Getting all 
export async function GET(req: NextRequest) {
    try {
       
        return new Response()
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