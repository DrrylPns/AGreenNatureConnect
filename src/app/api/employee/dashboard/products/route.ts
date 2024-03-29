import { getAuthSession } from "../../../../../lib/auth"
import prisma from "@/lib/db/db"

export async function GET(req: Request) {

    const session = await getAuthSession()

    if (session?.user.role !== "EMPLOYEE" || !session.user) return new Response("Error: Unauthorized", { status: 401 })

    try {
        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const community = await prisma.community.findFirst({
            where: {
                id: loggedIn?.Community?.id
            }
        })

        const products = await prisma.product.count({
            where: {
                communityId: community?.id
            }
        })

        return new Response(JSON.stringify(products))
    } catch (error) {
        return new Response('Could not fetch number of products', { status: 500 })
    }
}