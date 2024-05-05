"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { PaymentGcashSchema } from "@/lib/validations/paymentGcashSchema"
import { revalidatePath } from "next/cache"

export const insertProof = async (img: string, id: string) => {
    if (!id) return { error: "No transaction id found." }

    if (!img) return { error: "No image found." }
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const transaction = await prisma.transaction.update({
        where: { id },
        include:{
            buyer: true
        },
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

    const transaction = await prisma.transaction.update({
        where: { id },
        include:{
            buyer: true
        },
        data: {
            paymentStatus: "Paid"
        },
    })
    await prisma.employeeActivityHistory.create({
        data:{
          type: "MARKETHUB_ORDERS",
          transactionId: transaction.id,
          employeeId: session.user.id,
          amount: transaction.amount,
          buyer: transaction.buyer.name + " " + transaction.buyer.lastName,
          paymentStatus: transaction.paymentStatus,
          status: transaction.status,
          typeOfActivity: "Approved the Order"
        }
      })

    revalidatePath("/orders")
    return { success: "Payment status confirmed." }
}