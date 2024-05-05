import { getAuthSession } from "../../../../lib/auth"
import prisma from "@/lib/db/db"
import { AddStocksScehma } from "@/lib/validations/employee/products"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {

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

    const community = await prisma.community.findFirst({
        where: {
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

        for (const measurementData of perMeasurement) {
            const { measurement, price, estPieces } = measurementData;

            const existingVariant = existingProduct.variants.find(
                (variant) => variant.variant === measurement && variant.unitOfMeasurement === typeOfMeasurement
            );
            console.log(`This is the measurementData: ${measurementData}`)
            console.log(`This is the measurement: ${measurement}`) // 1 pack 2 packs 3 packs 4 packs etc..
            console.log(`This is the price: ${price}`)
            console.log(`This is the est pcs: ${estPieces}`)

            if (existingVariant) {
                await prisma.variant.update({
                    where: { id: existingVariant.id },
                    data: {
                        variant: measurement,
                        price,
                        EstimatedPieces: Number(estPieces),
                        unitOfMeasurement: typeOfMeasurement,
                    },
                });
            } else {
                await prisma.variant.create({
                    data: {
                        product: { connect: { id: existingProduct.id } },
                        variant: measurement,
                        EstimatedPieces: Number(estPieces),
                        price,
                        unitOfMeasurement: typeOfMeasurement,
                    },
                });
            }
        }

        if (typeOfMeasurement === "Kilograms") {
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    kilograms: quantity,
                }
            })
        } else if (typeOfMeasurement === "Grams") {
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    grams: quantity,
                }
            })
        } else if (typeOfMeasurement === "Pieces") {
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    pieces: quantity,
                }
            })
        } else if (typeOfMeasurement === "Pounds") {
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    pounds: quantity,
                }
            })
        } else if (typeOfMeasurement === "Packs") {
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    packs: quantity,
                }
            })
        }

        await prisma.employeeActivityHistory.create({
            data:{
              type: "MARKETHUB_PRODUCTS",
              employeeId: session.user.id, 
              productId: existingProduct.id,
              typeOfActivity: `Added ${quantity + " " + typeOfMeasurement}`
            }
        })

        return new NextResponse(`Successfully added stocks to the product.`, { status: 200 });
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }
}