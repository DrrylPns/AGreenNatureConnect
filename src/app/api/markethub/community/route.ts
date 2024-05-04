import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    try {
        const getAllCommunity = await prisma.community.findMany({
            where: {
                isArchived: false
            },
        })
        return new Response(JSON.stringify(getAllCommunity), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}