import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json()
        const { transactionId } = body

        const cancelOrderById = await prisma.transaction.update({
            where:{
                id: transactionId
            },
            data:{
                status: "CANCELLED"
            }
        })
        revalidatePath('/orders', 'layout')
        return new Response(JSON.stringify(cancelOrderById));
    } catch (error) {
        
    }
}