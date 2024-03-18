import { getAuthSession } from "../../../../lib/auth"
import prisma from "@/lib/db/db"
import { AddStocksScehma } from "@/lib/validations/employee/products"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {

    const session = await getAuthSession()

    const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            // userId: user?.id
            id: loggedInUser?.Community?.id
        }
    })

    if (loggedInUser?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const { id, perMeasurement, quantity, typeOfMeasurement, } = AddStocksScehma.parse(body)

        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
                communityId: community?.id,
            },
            include: {
                variants: true,
            },
        });

        if (!existingProduct) {
            return new NextResponse(`Product not found.`, { status: 404 });
        }

        const variantToUpdate = existingProduct.variants.find(
            (variant) => variant.unitOfMeasurement === typeOfMeasurement
        );

        if (!variantToUpdate) {
            const createdVariant = await prisma.variant.create({
                data: {
                    unitOfMeasurement: typeOfMeasurement,
                    variant: 0, // TODO
                    EstimatedPieces: Number(quantity),
                    price: 0, // TODO
                    product: {
                        connect: {
                            id: existingProduct.id,
                        },
                    },
                },
            });

            return new NextResponse(`Successfully created a new variant for ${typeOfMeasurement}.`, {
                status: 200,
            });
        }

        const updatedVariant = await prisma.variant.update({
            where: {
                id: variantToUpdate.id,
            },
            data: {
                EstimatedPieces: variantToUpdate.EstimatedPieces + Number(quantity),

            },
        });


        const updatedProduct = await prisma.product.update({
            where: {
                id: existingProduct.id,
            },
            data: {

                // kilogram: existingProduct?.kilogram + Number(quantity),
            },
        });

        return new NextResponse(`Successfully added stocks to the product.`, { status: 200 });
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }
}