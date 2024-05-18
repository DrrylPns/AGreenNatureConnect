import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {filter } = body;
    try {
        const getAllCommunity = await prisma.community.findMany({
            where: {
                isArchived: false,
                address: filter === "all" || filter === "" ? undefined : filter
            },
        })
        return new Response(JSON.stringify(getAllCommunity), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}

export async function GET(req: NextRequest) {
   
    try {
        const getAllCommunity = await prisma.community.findMany({
            where: {
                isArchived: false,
            },
        })
        return new Response(JSON.stringify(getAllCommunity), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
