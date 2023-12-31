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
        where:{
            userId: user?.id
        }
    })

    try {
        const products = await prisma.product.findMany({
            orderBy: {
                itemNumber: 'asc'
            },
            where: {
                communityId: community?.id
            },
            include: {
                creator: true
            }
        })

        return new NextResponse(JSON.stringify(products))
    } catch (error) {
        return new NextResponse('Could not fetch products' + error, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getAuthSession()

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    const community = await prisma.community.findFirst({
        where:{
            userId: user?.id
        }
    })

    if (user?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {name, kilo, price} = CreateProductSchema.parse(body)

        if(price === 0 || price <= 0) return new Response("Please put a valid price", {status: 402})

        if(kilo === 0 || kilo <= 0) return new Response("Please put a valid weight", {status: 403})

        await prisma.product.create({
            data: {
                name,
                kilo,
                price,
                creatorId: user?.EmployeeId as string,
                communityId: community?.id
            }
        })

        return new NextResponse(`Successfully added ${name}`)
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {

    const session = await getAuthSession()

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    const community = await prisma.community.findFirst({
        where:{
            userId: user?.id
        }
    })

    if (user?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {id, name, kilo, price} = UpdateProductSchema.parse(body)

        if(price === 0 || price <= 0) return new Response("Please put a valid price", {status: 402})

        if(kilo === 0 || kilo <= 0) return new Response("Please put a valid weight", {status: 403})

        // wag malilito sa batuhan ng id
        await prisma.product.update({
            where: {
                id, // product id
                communityId: community?.id // community id
            },
            data: {
                name,
                kilo,
                price,
            }
        })

        return new NextResponse(`Successfully updated item the item`)
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }

}

export async function DELETE() {
    
}