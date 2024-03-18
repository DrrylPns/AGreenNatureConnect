import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const pickupTransactions = await prisma.transaction.findMany({
            where: {
                buyerId: session.user.id,
                status: "PICK_UP"
            },
            orderBy: {
                updatedAt: 'asc'
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
        return new Response(JSON.stringify(pickupTransactions), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
};

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json()
        const { transactionId } = body

        const acceptOrderById = await prisma.transaction.update({
            where: {
                id: transactionId
            },
            data: {
                status: "PICK_UP"
            }
        })
        revalidatePath('/orders', 'layout')
        return new Response(JSON.stringify(acceptOrderById));
    } catch (error) {

    }
}