"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { PaymentGcashSchema } from "@/lib/validations/paymentGcashSchema"
import { revalidatePath } from "next/cache"

export const insertProof = async (img: string, id: string) => {
    if (!id) return { error: "No transaction id found." }

    if (!img) return { error: "No image found." }

    await prisma.transaction.update({
        where: { id },
        data: {
            gcashReciept: img
        },
    })

    revalidatePath("/order-status")
    revalidatePath("/orders")
    return { success: "Successfully uploaded proof." }
}

export const confirmProof = async (id: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const user = await prisma.user.findFirst({
        where: { id: session.user.id }
    })

    if (!user) return { error: "No user found." }

    if (user.role === "USER") return { error: "Invalid action!" }

    await prisma.transaction.update({
        where: { id },
        data: {
            paymentStatus: "Paid"
        },
    })

    revalidatePath("/orders")
    return { success: "Payment status confirmed." }
}