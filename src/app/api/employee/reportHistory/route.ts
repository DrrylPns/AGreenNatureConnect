import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getAuthSession()
    //need to fetch reports based on the community ng rineport.....
    try {
        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const reports = await prisma.report.findMany({
            where: {
                status: {
                    in: ["RESOLVED", "REJECTED"]
                },
                reported: {
                    communityId: loggedInUser?.Community?.id
                }
            },
            include: {
                post: {
                    include: {
                        topic: true
                    }
                },
                reported: true,
                reporter: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return new NextResponse(JSON.stringify(reports))
    } catch (error) {
        return new NextResponse("Can't get reports" + error, { status: 500 })
    }
}