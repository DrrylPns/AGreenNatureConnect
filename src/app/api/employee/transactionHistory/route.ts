import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getAuthSession()

        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id,
            },
            include: {
                Community: true
            }
        })

        const transactions = await prisma.employeeActivityHistory.findMany({
            where: {
                employee:{
                    communityId:loggedInUser?.Community?.id,
                },
                type: "MARKETHUB_ORDERS",
            },
            include: {
               employee: true,
               transaction: {
                include:{
                    orderedProducts:{
                        include:{
                            product: true,
                            transaction: true
                        }
                    }
                }
               },
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        return new NextResponse(JSON.stringify(transactions))
    } catch (error) {
        return new NextResponse('Could not fetch transaction history' + error, { status: 500 })
    }
}