import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const param = searchParams.get("cursor");
        const limit = 18
        const getAllProducts = await prisma.product.findMany({
            cursor: param ? {
                id: param 
            } : undefined,
            take: limit,
            skip: param === '' ? 0 : 1,
            where:{
                isFree: {
                    equals: false
                },
                status:{
                    equals: "APPROVED"
                },
                category: {
                    equals: "Others"
                },
                
            },
            include:{
               Stock: true,
               community: true,
               reviews: true,
            }
        })
        const myCursor = getAllProducts.length === limit ? getAllProducts[getAllProducts.length - 1].id : undefined;
        return new Response(JSON.stringify({ getAllProducts, nextId: myCursor }))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}