import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const url = req.nextUrl.pathname;
    const decodeUrl = decodeURIComponent(url)
    const commmunityName = decodeUrl.split("products/")[1]
   
    try {
        const getProductsByCommunity = await prisma.product.findMany({
            where:{
                community:{
                    name: commmunityName
                }
            },
            include:{
               community: true
            }
        })
        console.log(`This is the community name: ${commmunityName}`)
        return new Response(JSON.stringify(getProductsByCommunity), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}