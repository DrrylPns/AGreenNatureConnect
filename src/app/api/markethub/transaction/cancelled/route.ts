import { sendCancelledNotification } from "@/lib/mail";
import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { DeclineProductSchema } from "@/lib/validations/employee/products";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const cancelledTransactions = await prisma.transaction.findMany({
            where: {
                buyerId: session.user.id,
                status: "CANCELLED"
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                buyer: true,
                seller: true,
                orderedVariant: {
                    include: {
                        product: true,
                        variant: true
                    }
                }
            }
        })

        return new Response(JSON.stringify(cancelledTransactions), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
};


export async function PUT(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json()
        const { transactionId, type, otherReason } = DeclineProductSchema.parse(body)

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
            include: {
                buyer: true,
                seller: true,
                orderedVariant: {
                    include: {
                        variant: true,
                        product: true,
                    },
                },
            },
        });

        const existingTransaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });

        if (!existingTransaction) {
            return new NextResponse('Transaction not found', { status: 404 });
        }

        const cancelOrderById = await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            include:{
                buyer: true
            },
            data: {
                cancelType: type,
                cancelReason: otherReason,
                status: "CANCELLED"
            }
        })

        if (!transaction) {
            return new Response('Invalid transaction', {
                status: 400,
            });
        }

        if (cancelOrderById) {
            await prisma.notification.create({
                data: {
                    type: "CANCELLED",
                    userId: cancelOrderById.buyerId,
                    communityId: cancelOrderById.sellerId,
                    transactionId: cancelOrderById.id
                },
            })

            if (transaction.buyer.isNotificationsEnabled) {
                sendCancelledNotification(transaction.buyer.email as string, cancelOrderById.id, transaction.seller.name, cancelOrderById.cancelReason, cancelOrderById.cancelType)
            }
        }

        
        await prisma.employeeActivityHistory.create({
            data:{
              type: "MARKETHUB_ORDERS",
              transactionId: cancelOrderById.id,
              employeeId: session.user.id,
              amount: cancelOrderById.amount,
              buyer: cancelOrderById.buyer.name + " " + cancelOrderById.buyer.lastName,
              paymentStatus: cancelOrderById.paymentStatus,
              status: cancelOrderById.status
            }
          })


        revalidatePath('/orders', 'layout')
        return new Response(JSON.stringify(cancelOrderById));
    } catch (error) {
        console.error("Error updating transaction:", error);
        return new NextResponse(`Could not update transaction: ${error}`, { status: 500 });
    }
}


