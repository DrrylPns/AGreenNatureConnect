import prisma from "@/lib/db/db";
import { PaymentGcashSchema } from "@/lib/validations/paymentGcashSchema";
import { z } from "zod";

export async function POST(req: Request){
    try {
        const body = req.json();
        const { receipt, transactionId } = PaymentGcashSchema.parse(body);
        await prisma.transaction.update({
            where:{
                id: transactionId
            },
            data: {
               gcashReciept: receipt
            }
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid POST request data passed', { status: 422 })
        }
        return new Response('Could not update receipt at this time, please try again later', { status: 500 })
        
    }
}