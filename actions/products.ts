"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { UpdateStocksSchema, UpdateStocksType } from "@/lib/validations/employee/products"
import { Stocks } from "@prisma/client"
import { id } from "date-fns/locale"
import { revalidatePath } from "next/cache"
const cron = require('node-cron');


export const fetchProducts = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    if (!user) return { error: "No user found!" }

    const community = await prisma.community.findFirst({
        where: {
            id: user.Community?.id
        }
    })
    const products = await prisma.product.findMany({
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
            Stock: true
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    await products.forEach(async(product)=>{
        let totalStocks = 0
        const currentDate = new Date()
        const productStock = await prisma.stocks.findMany({
            where:{
                productId: product.id
            }
        })
        const notExpiredStocks: Stocks[] | null = productStock.filter(stock => {
            const expirationDate = new Date(stock.expiration);
            return expirationDate >= currentDate;
        });
        notExpiredStocks.map((stock)=>{
            totalStocks += stock.numberOfStocks
        })
        await prisma.product.update({
            where: { id: product.id },
            data: {
                quantity: totalStocks
            },
        });
    })

    const latestProducts = await prisma.product.findMany({
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
            Stock: true
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    await prisma.product.updateMany({
        where:{
            Stock: {
                every:{
                    expiration:{
                        lt: new Date()
                    }
                }
            }
        },
        data:{

        }
    })



    revalidatePath("/employee/inventory")
    return latestProducts
}

export const archiveProduct = async (id: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    await prisma.product.update({
        where: { id },
        data: {
            status: "ARCHIVED"
        }
    })

    revalidatePath("/employee/inventory")
    return { success: "Successfully archived the product." }
}

export const unarchiveProduct = async (id: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    await prisma.product.update({
        where: { id },
        data: {
            status: "PENDING"
        }
    })

    revalidatePath("/employee/archived-products")
    return { success: "Successfully restored the product." }
}

export const fetchArchivedProducts = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const products = await prisma.product.findMany({
        where: { status: "ARCHIVED" },
        include: {
            creator: true,
           
        },
    })

    if (!products) return { error: "No product found!" }

    return products
}

export const updateStocks = async (id: string | undefined, values: UpdateStocksType) => {
    try {
        const validatedFields = UpdateStocksSchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields" }

        const { quantity, typeOfMeasurement } = validatedFields.data

        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

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

        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
                communityId: community?.id,
            },
            include: {
               
            },
        });

        if (!existingProduct) return { error: "Can't update because there is no product found!" }

       
        await prisma.employeeActivityHistory.create({
            data:{
              type: "MARKETHUB_PRODUCTS",
              employeeId: session.user.id,
              productId: existingProduct.id,
              typeOfActivity: `Added ${quantity + " " + typeOfMeasurement}`
            }
        })

        revalidatePath("/employee/inventory")
        return { success: "Stocks updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const fetchStocks = async (productId: string) =>{
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    const community = await prisma.community.findFirst({
        where:{
            products:{
                every:{
                    id: productId
                }
            }
        }
    })
    if (!user) return { error: "No user found!" }

    const stocks = await prisma.stocks.findMany({
        where:{
            product:{
                id: productId
            },
            
        },
        include:{
            product: true,
        }
    })
    console.log(productId)
    return stocks
}