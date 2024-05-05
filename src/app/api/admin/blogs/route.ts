import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { formatStatus } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
      }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            id: user?.Community?.id
        }
    })

    const body = await req.json()

    try {
        const { id, status } = body;

        const blog = await prisma.blog.update({
            where: {
                id,
            },
            data: {
                isApproved: status
            },
        })

        await prisma.employeeActivityHistory.create({
            data:{
                type: "LEARNINGMATERIALS",
                employeeId: session.user.id,
                blogId: blog.id,
                typeOfActivity: `${formatStatus(blog.isApproved)} the ${blog.title}`
            }
          })

        return new NextResponse(`Successfully updated`)
    } catch (error) {
        return new NextResponse('Could not update!' + error, { status: 500 })
    }
}