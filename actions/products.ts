"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
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
    return { success: "Successfully unarchived the product." }
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