import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const getAllFruits = await prisma.product.findMany({
            where:{
                isFree: {
                    equals: false
                },
                category:{
                    equals:"Fruits"
                }
            },
            include:{
               variants: true,
               community: true
            }
            
        })
        return new Response(JSON.stringify(getAllFruits), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}