import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { amount, sellerId, variantId, productId, paymentMethod } = body;
        const referenceId = uuidv4();
        const transaction = await prisma.transaction.create({
            data: {
                referenceId,
                amount,
                status: "PENDING",
                buyerId: session.user.id,
                paymentStatus: 'Not Paid',
                sellerId,
                paymentMethod,
                orderedVariant: {
                    create: {
                        price: amount,
                        variantId,
                        productId
                    }
                }
            },
        });
        return new Response(JSON.stringify(paymentMethod));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}