import { getAuthSession } from "../../../../lib/auth"
import prisma from "@/lib/db/db"
import { AddStocksScehma } from "@/lib/validations/employee/products"
import { Stocks } from "@prisma/client"
import { filter } from "lodash"
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

    // if (loggedInUser?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

    try {
        const body = await req.json()

        const { id, harvestedFrom, quantity, expiration} = AddStocksScehma.parse(body)

        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
                communityId: community?.id,
            },
        });

        if (!existingProduct) {
            return new NextResponse(`Product not found.`, { status: 404 });
        }

        if (existingProduct) {
            const productStock = await prisma.stocks.findMany({
                where:{
                    productId: existingProduct.id
                }
            })
            let totalStocks = 0
            const currentDate = new Date()
            const notExpiredStocks: Stocks[] | null = productStock.filter(stock => {
                const expirationDate = new Date(stock.expiration);
                return expirationDate >= currentDate;
            });
            notExpiredStocks.map((stock)=>{
                totalStocks += stock.numberOfStocks
            })
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: totalStocks + quantity
                },
            });

            await prisma.stocks.create({
                data:{
                    batchNo: "batch",
                    numberOfStocks: quantity,
                    harvestedFrom: harvestedFrom,
                    expiration: expiration,
                    productId: existingProduct.id,
                }
            })
        }

        await prisma.employeeActivityHistory.create({
            data: {
                type: "MARKETHUB_PRODUCTS",
                employeeId: session.user.id,
                productId: existingProduct.id,
                typeOfActivity: `Added new stocks: ${quantity}kg. ${existingProduct.name} from ${harvestedFrom}`
            }
        })

        return new NextResponse(`Successfully added stocks to the product.`, { status: 200 });
    } catch (error) {
        return new NextResponse('Could not create a product' + error, { status: 500 })
    }
}