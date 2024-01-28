import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { CreateProductSchema, UpdateProductSchema } from "@/lib/validations/employee/products";

export async function GET() {
    const session = await getAuthSession()

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            userId: user?.id
        }
    })

    console.log()

    try {
        const products = await prisma.product.findMany({
            // orderBy: {
            //     itemNumber: 'asc'
            // },
            where: {
                community: {
                    name: community?.name
                }
            },
            include: {
                creator: true,
               
            }
        })

        return new NextResponse(JSON.stringify(products))
    } catch (error) {
        return new NextResponse('Could not fetch products' + error, { status: 500 })
    }
}



        // const { productImage, name, kilo, price } = CreateProductSchema.parse(body)

        // if (price === 0 || price <= 0) return new Response("Please put a valid price", { status: 402 })

        // if (kilo === 0 || kilo <= 0) return new Response("Please put a valid weight", { status: 403 })

        // await prisma.product.create({
        //     data: {
        //         productImage,
        //         name,
        //         price,

        //         // isFree = false,
        //         creatorId: user?.EmployeeId as string,
        //         communityId: community?.id
        //     }
        // })


