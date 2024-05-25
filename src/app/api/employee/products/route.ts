import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { CreateProductSchema, UpdateProductSchema } from "@/lib/validations/employee/products";
import { revalidatePath } from "next/cache";

export async function GET() {
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
            // userId: user?.id
            id: user?.Community?.id
        }
    })

    // console.log()

    try {
        const products = await prisma.product.findMany({
            // orderBy: {
            //     itemNumber: 'asc'
            // },
            where: {
                community: {
                    name: community?.name
                },
                status: {
                    not: "ARCHIVED"
                }
            },
            include: {
                creator: true,
                // variants: true,
                // Kilo: true,
                // Pack: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return new NextResponse(JSON.stringify(products))
    } catch (error) {
        return new NextResponse('Could not fetch products' + error, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
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
            // userId: user?.id
            id: user?.Community?.id
        }
    })

    // if (user?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        const {
            productImage,
            name,
            category,
            priceInKg,
            priceInPieces,
            priceInPacks,
            markup,
        } = CreateProductSchema.parse(body)


        const totalPriceInKg = priceInKg as number + (priceInKg as number * (markup / 100));
        const totalPriceInPieces = priceInPieces as number + (priceInPieces as number * (markup / 100));
        const totalPriceInPacks = priceInPacks as number + (priceInPacks as number * (markup / 100));

        if (community && user) {
            const createProduct = await prisma.product.create({
                data: {
                    productImage: productImage as string,
                    name,
                    category,
                    priceInKg: priceInKg === undefined ? 0 : totalPriceInKg,
                    priceInPieces: priceInPieces === undefined ? 0 : totalPriceInPieces,
                    priceInPacks: priceInPacks === undefined ? 0 : totalPriceInPacks,
                    // quantity,
                    creatorId: user?.id as string,
                    communityId: community?.id,
                    status: "APPROVED",
                    markUp: markup,
                }
            });

            // const addStocks = await prisma.stocks.create({
            //     data: {
            //         numberOfStocks: quantity,
            //         harvestedFrom: harvestedFrom,
            //         unitOfMeasurement,
            //         expiration: expiration,
            //         productId: createProduct.id,

            //     }
            // })

            // await prisma.stockLogs.create({
            //     data: {
            //         numberOfStocks: quantity,
            //         harvestedFrom: harvestedFrom,
            //         expiration: expiration,
            //         productId: createProduct.id,
            //     }
            // })
            await prisma.employeeActivityHistory.create({
                data: {
                    type: "MARKETHUB_PRODUCTS",
                    employeeId: session.user.id,
                    productId: createProduct.id,
                    typeOfActivity: `Created new product: ${createProduct.name}, Prices: Kg = ₱${priceInKg}, Pieces = ₱${priceInPieces}, Packs = ₱${priceInPacks}  `
                }
            })
        }

        revalidatePath("/employee/inventory", "page")
        console.log("created Product")
        return new NextResponse(`Successfully added product!`);
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }
}

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

    // if (loggedInUser?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const {
            id,
            name,
            category,
            productImage,
            priceInKg,
            priceInPacks,
            priceInPieces,
            markup,
        } = UpdateProductSchema.parse(body)

        const totalPriceInKg = priceInKg as number + (priceInKg as number * (markup / 100));
        const totalPriceInPieces = priceInPieces as number + (priceInPieces as number * (markup / 100));
        const totalPriceInPacks = priceInPacks as number + (priceInPacks as number * (markup / 100));

        await prisma.product.update({
            where: {
                id, // product id
                communityId: community?.id // community id
            },
            data: {
                productImage,
                name,
                category,
                priceInKg: totalPriceInKg,
                priceInPieces: totalPriceInPieces,
                priceInPacks: totalPriceInPacks,
                markUp: markup,
            }
        })

        return new NextResponse(`Successfully updated the item`)
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }

}

export async function DELETE() {

}
