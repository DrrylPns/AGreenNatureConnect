import prisma from "@/lib/db/db"
import { CommunitySchema } from "@/lib/validations/admin/createCommunity"
import { NextRequest, NextResponse } from "next/server"

// export async function GET() {
//     try {
//         const communities = await prisma.community.findMany({
//             include: {
//                 user: true
//             }
//         })

//         return new NextResponse(JSON.stringify(communities))
//     } catch (error) {
//         return new NextResponse('Could not fetch communities' + error, { status: 500 })
//     }
// }

export async function POST(req: NextRequest) {
    try {
        //TODO: admins are the only one who can create community

        const body = await req.json()

        const { name, users } = CommunitySchema.parse(body)


        const communityExist = await prisma.community.findFirst({
            where: {
                name
            }
        })

        if (communityExist) return new NextResponse(`${name} community already exists`, { status: 402 })

        await prisma.community.create({
            data: {
                name,
                user: {
                    connect: {
                        id: users
                    }
                }
            }
        })

        return new NextResponse(`Successfully created ${name} community!`)
    } catch (error) {
        return new NextResponse('Could not create community' + error, { status: 500 })
    }
}