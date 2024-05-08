
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db/db";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
      }
      const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    try {
        const activities = await prisma.employeeActivityHistory.findMany({
            where: {
                employee:{
                    communityId:loggedInUser?.Community?.id,
                },
            },
            include: {
                product:{
                    include:{
                        orderedProducts:true
                    }
                },
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
        return new Response(JSON.stringify(activities), { status: 200 })
    } catch (error) {
        return new NextResponse('Could get activity logs!' + error, { status: 500 })
    }
}