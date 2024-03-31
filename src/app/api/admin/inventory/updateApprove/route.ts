import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const session = await getAuthSession()

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
        revalidatePath('/markethub', 'layout')

        return new NextResponse(`Successfully updated the item`)
    } catch (error) {
        return new NextResponse('Could not update the product' + error, { status: 500 })
    }
}