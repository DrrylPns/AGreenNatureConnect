import prisma from "@/lib/db/db"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const url = req.nextUrl.pathname
    const decodedUrl = decodeURIComponent(url);
    const communityName = decodedUrl.split("products/")[1]
    try {
        const getAllVegetables = await prisma.product.findMany({
            where:{
                
                isFree: {
                    equals: false
                },
                category:{
                    equals:"Vegetables"
                }
            },
            include:{
               variants: true,
               community: true
            }
            
        })
        console.log(url)
        return new Response(JSON.stringify(getAllVegetables), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}