import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";

//Getting all products
export async function GET(req: NextRequest) {
    try {

        const getAllProducts = await prisma.product.findMany({
            include:{
                Kilo: true,
                Pack: true,
                community: true
            }
        })
       
        return new Response(JSON.stringify(getAllProducts), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}
