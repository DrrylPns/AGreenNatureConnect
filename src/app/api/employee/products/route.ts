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
                variants: true,
                // Kilo: true,
                // Pack: true,
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
        where: {
            userId: user?.id
        }
    })

    if (user?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        const {
            productImage,
            name,
            category,
            perMeasurement,
            typeOfMeasurement,
            quantity,
        } = CreateProductSchema.parse(body)

        console.log("PERMESURE" + perMeasurement)
        console.log(typeOfMeasurement)
        // console.log(quantity)

        if (typeOfMeasurement === "Kilograms") {
            await prisma.product.create({
                data: {
                    productImage,
                    name,
                    category,
                    kilogram: quantity,
                    grams: 0,
                    packs: 0,
                    pieces: 0,
                    pounds: 0,
                    creatorId: user?.EmployeeId as string,
                    communityId: community?.id,
                    variants: {
                        create: perMeasurement.map((measure) => ({
                            unitOfMeasurement: typeOfMeasurement,
                            variant: measure.measurement,
                            EstimatedPieces: Number(measure.estPieces),
                            price: measure.price,
                        }))
                    }
                    // Kilo: {
                    //     create: perKilo.map((kilo) => ({
                    //         kilo: kilo.kilo,
                    //         price: kilo.price,
                    //         estPieces: kilo.estPieces,
                    //     })),
                    // },
                    // Pack: {
                    //     create: perPack.map((pack) => ({
                    //         pack: pack.pack,
                    //         price: pack.price,
                    //         estPieces: pack.estPieces,
                    //     })),
                    // },
                },
            });
        }
        if (typeOfMeasurement === "Grams") {
            await prisma.product.create({
                data: {
                    productImage,
                    name,
                    category,
                    kilogram: 0,
                    grams: quantity,
                    packs: 0,
                    pieces: 0,
                    pounds: 0,
                    creatorId: user?.EmployeeId as string,
                    communityId: community?.id,
                    variants: {
                        create: perMeasurement.map((measure) => ({
                            unitOfMeasurement: typeOfMeasurement,
                            variant: measure.measurement,
                            EstimatedPieces: Number(measure.estPieces),
                            price: measure.price,
                        }))
                    }
                    // Kilo: {
                    //     create: perKilo.map((kilo) => ({
                    //         kilo: kilo.kilo,
                    //         price: kilo.price,
                    //         estPieces: kilo.estPieces,
                    //     })),
                    // },
                    // Pack: {
                    //     create: perPack.map((pack) => ({
                    //         pack: pack.pack,
                    //         price: pack.price,
                    //         estPieces: pack.estPieces,
                    //     })),
                    // },
                },
            });
        }
        if (typeOfMeasurement === "Pieces") {
            await prisma.product.create({
                data: {
                    productImage,
                    name,
                    category,
                    kilogram: 0,
                    grams: 0,
                    packs: 0,
                    pieces: quantity,
                    pounds: 0,
                    creatorId: user?.EmployeeId as string,
                    communityId: community?.id,
                    variants: {
                        create: perMeasurement.map((measure) => ({
                            unitOfMeasurement: typeOfMeasurement,
                            variant: measure.measurement,
                            EstimatedPieces: Number(measure.estPieces),
                            price: measure.price,
                        }))
                    }
                    // Kilo: {
                    //     create: perKilo.map((kilo) => ({
                    //         kilo: kilo.kilo,
                    //         price: kilo.price,
                    //         estPieces: kilo.estPieces,
                    //     })),
                    // },
                    // Pack: {
                    //     create: perPack.map((pack) => ({
                    //         pack: pack.pack,
                    //         price: pack.price,
                    //         estPieces: pack.estPieces,
                    //     })),
                    // },
                },
            });
        }

        if (typeOfMeasurement === "Pounds") {
            await prisma.product.create({
                data: {
                    productImage,
                    name,
                    category,
                    kilogram: 0,
                    grams: 0,
                    packs: 0,
                    pieces: 0,
                    pounds: quantity,
                    creatorId: user?.EmployeeId as string,
                    communityId: community?.id,
                    variants: {
                        create: perMeasurement.map((measure) => ({
                            unitOfMeasurement: typeOfMeasurement,
                            variant: measure.measurement,
                            EstimatedPieces: Number(measure.estPieces),
                            price: measure.price,
                        }))
                    }
                    // Kilo: {
                    //     create: perKilo.map((kilo) => ({
                    //         kilo: kilo.kilo,
                    //         price: kilo.price,
                    //         estPieces: kilo.estPieces,
                    //     })),
                    // },
                    // Pack: {
                    //     create: perPack.map((pack) => ({
                    //         pack: pack.pack,
                    //         price: pack.price,
                    //         estPieces: pack.estPieces,
                    //     })),
                    // },
                },
            });
        }

        if (typeOfMeasurement === "Packs") {
            await prisma.product.create({
                data: {
                    productImage,
                    name,
                    category,
                    kilogram: 0,
                    grams: 0,
                    packs: quantity,
                    pieces: 0,
                    pounds: 0,
                    creatorId: user?.EmployeeId as string,
                    communityId: community?.id,
                    variants: {
                        create: perMeasurement.map((measure) => ({
                            unitOfMeasurement: typeOfMeasurement,
                            variant: measure.measurement,
                            EstimatedPieces: Number(measure.estPieces),
                            price: measure.price,
                        }))
                    }
                    // Kilo: {
                    //     create: perKilo.map((kilo) => ({
                    //         kilo: kilo.kilo,
                    //         price: kilo.price,
                    //         estPieces: kilo.estPieces,
                    //     })),
                    // },
                    // Pack: {
                    //     create: perPack.map((pack) => ({
                    //         pack: pack.pack,
                    //         price: pack.price,
                    //         estPieces: pack.estPieces,
                    //     })),
                    // },
                },
            });
        }


        // const createdProduct = await prisma.product.create({
        //     data: {
        //         productImage,
        //         name,
        //         category,
        //         creatorId: user?.EmployeeId as string,
        //         communityId: community?.id,
        //         variants: {
        //             create: perMeasurement.map((measure) => ({
        //                 unitOfMeasurement: typeOfMeasurement,
        //                 variant: measure.measurement,
        //                 EstimatedPieces: Number(measure.estPieces),
        //                 price: measure.price,
        //             }))
        //         }
        //         // Kilo: {
        //         //     create: perKilo.map((kilo) => ({
        //         //         kilo: kilo.kilo,
        //         //         price: kilo.price,
        //         //         estPieces: kilo.estPieces,
        //         //     })),
        //         // },
        //         // Pack: {
        //         //     create: perPack.map((pack) => ({
        //         //         pack: pack.pack,
        //         //         price: pack.price,
        //         //         estPieces: pack.estPieces,
        //         //     })),
        //         // },
        //     },
        // });

        // const kiloAggregate = await prisma.kilo.groupBy({
        //     where: {
        //         productId: { equals: createdProduct.id },
        //     },
        //     by: ["productId"],
        //     _sum: { kilo: true },
        // });

        // const packAggregate = await prisma.perPack.groupBy({
        //     where: {
        //         productId: { equals: createdProduct.id },
        //     },
        //     by: ["productId"],
        //     _sum: { pack: true },
        // });

        // const updatedProduct = await prisma.product.update({
        //     where: { id: createdProduct.id },
        //     data: {
        //         stockKilo: kiloAggregate[0]?._sum?.kilo || 0,
        //         stockPack: packAggregate[0]?._sum?.pack || 0,
        //     },
        // });


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
        return new NextResponse(`Successfully added product!`);
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
        where: {
            userId: user?.id
        }
    })

    if (user?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const { id, name, category, productImage } = UpdateProductSchema.parse(body)

        await prisma.product.update({
            where: {
                id, // product id
                communityId: community?.id // community id
            },
            data: {
                productImage,
                name,
                category,
            }
        })

        return new NextResponse(`Successfully updated the item`)
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }

}

export async function DELETE() {

}
