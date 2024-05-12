
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const pendingTransactions = await prisma.transaction.findMany({
            where: {
                buyerId: session.user.id,
                status: "PENDING"
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                buyer: true,
                seller: true,
                orderedProducts: {
                    include: {
                        product: true,
                        transaction: true
                    }
                }
            }
        });

        return new Response(JSON.stringify(pendingTransactions), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
};   