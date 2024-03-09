import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest) {

    const session = await getAuthSession()
    const productId = req.nextUrl.pathname.replace('/api/employee/products/', '');

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

    try {
        const productData = await prisma.product.findFirst({
            where: {
                id: productId,
                community: {
                    name: community?.name
                }
            },
            include: {
                creator: true,
                variants: true,
            }
        })

        if (!productData) {
            return new NextResponse('Product not found', { status: 404 });
        }

        const productWithIsFree = {
            ...productData,
            isFree: productData?.isFree || false,
        };

        return new NextResponse(JSON.stringify(productWithIsFree));
    } catch (error) {
        return new NextResponse('Could not fetch product' + error, { status: 500 })
    }
}