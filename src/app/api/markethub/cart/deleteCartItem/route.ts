import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db"
import { DeleteCartItemSchema } from "@/lib/validations/addToCartSchema";
import { z } from "zod"

export async function POST(req: Request) {
    try {

        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
    
        const body = await req.json()

        const { id } = DeleteCartItemSchema.parse(body)

        await prisma.cart.delete({
            where: {
                id
            }
        })

        return new Response('OK')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response('Could not delete Item', { status: 500 })
    }
}