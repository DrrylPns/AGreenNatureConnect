import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 })
    }
    try {
        const getCartCount = await prisma.cart.count({
            where: {
                userId: session.user.id
            }
        })
        return new Response(JSON.stringify(getCartCount), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }

}