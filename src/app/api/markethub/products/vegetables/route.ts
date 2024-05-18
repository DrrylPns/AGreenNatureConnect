import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const param = searchParams.get("cursor");
        const barangay = searchParams.get("barangay");
        const limit = 12
        const getAllProducts = await prisma.product.findMany({
            cursor: param ? {
                id: param
            } : undefined,
            take: limit,
            skip: param === '' ? 0 : 1,
            where: {
                isFree: {
                    equals: false
                },
                quantity:{
                    gte: 1
                },
                status: {
                    equals: "APPROVED"
                },
                category: {
                    equals: "Vegetables"
                },
                community:{
                    address: barangay === null || barangay === "" || barangay === "all" || barangay === undefined ? undefined : barangay  
                }
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