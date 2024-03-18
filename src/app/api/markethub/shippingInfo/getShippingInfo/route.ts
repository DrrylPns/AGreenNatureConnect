import { getAuthSession } from "../../../../../lib/auth"
import prisma from "@/lib/db/db"

export async function GET(req: Request) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        const getShippingInfo = await prisma.shippingInfo.findFirst({
            where: {
                userId: session.user.id
            }
        })

        return new Response(JSON.stringify(getShippingInfo), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}