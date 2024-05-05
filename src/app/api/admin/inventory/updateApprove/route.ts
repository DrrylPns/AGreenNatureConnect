import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { formatStatus } from "@/lib/utils";
import { revalidatePath } from "next/cache";
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

        const updatedProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                status,
            },
        })

        await prisma.employeeActivityHistory.create({
            data:{
              type: "MARKETHUB_PRODUCTS",
              employeeId: session.user.id,
              productId: updatedProduct.id,
              typeOfActivity: `${formatStatus(updatedProduct.status)} the ${updatedProduct.name}`
            }
          })
        revalidatePath('/markethub', 'layout')

        return new NextResponse(`Successfully updated the item`)
    } catch (error) {
        return new NextResponse('Could not update the product' + error, { status: 500 })
    }
}