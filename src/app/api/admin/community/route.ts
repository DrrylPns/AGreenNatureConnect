import prisma from "@/lib/db/db"
import { CommunitySchema } from "@/lib/validations/admin/createCommunity"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const communities = await prisma.community.findMany()

        return new NextResponse(JSON.stringify(communities))
    } catch (error) {
        return new NextResponse('Could not fetch communities' + error, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { name } = CommunitySchema.parse(body)

        const rankExist = await prisma.community.findFirst({
            where: {
                name
            }
        })

        if (rankExist) return new NextResponse(`${name} community already exists`, { status: 402 })

        await prisma.community.create({
            data: {
                name,
            }
        })

        return new NextResponse(`Successfully created ${name} community!`)
    } catch (error) {
        return new NextResponse('Could not create community' + error, { status: 500 })
    }
}