import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    try {
      
        const getTransactionByUserId = await prisma.transaction.findMany({
            where:{
          
                status: "PENDING"
            },
            orderBy:{
                updatedAt: 'desc'
            },
            include:{
                buyer: true,
                seller: true,
                orderedVariant: {
                    include:{
                        product: true,
                        variant: true
                    }
                }
            }
        })

        return new Response(JSON.stringify(getTransactionByUserId), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
};   