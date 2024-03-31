import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getAuthSession()

        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const transactions = await prisma.transaction.findMany({
            where: {
                sellerId: loggedInUser?.Community?.id,
            },
            include: {
                buyer: true,
                orderedVariant: {
                    include: {
                        product: true,
                        variant: true,
                    }
                }
            }
        })

        transactions.forEach((transaction) => {
            console.log('Transaction:', transaction);
            console.log('Ordered Variants:', JSON.stringify(transaction.orderedVariant, null, 2));
        });

        return new NextResponse(JSON.stringify(transactions))
    } catch (error) {
        return new NextResponse('Could not fetch transaction history' + error, { status: 500 })
    }
}