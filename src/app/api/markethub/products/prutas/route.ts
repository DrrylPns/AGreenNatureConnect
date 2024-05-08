import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const getAllFruits = await prisma.product.findMany({
            where: {
                isFree: {
                    equals: false
                },
                status: {
                    equals: 'APPROVED'
                },
                category: {
                    equals: "Fruits"
                },
                // variants: {
                //     some: {
                //         variant: {
                //             not: 0
                //         }
                //     }
                // }
            },
            include: {
                // variants: true,
                community: true
            }

        })
        return new Response(JSON.stringify(getAllFruits), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}