"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { UpdateStocksSchema, UpdateStocksType } from "@/lib/validations/employee/products"
import { revalidatePath } from "next/cache"

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
            variants: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    return products
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
            variants: true,
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
                variants: true,
            },
        });

        if (!existingProduct) return { error: "Can't update because there is no product found!" }

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

        revalidatePath("/employee/inventory")
        return { success: "Stocks updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}