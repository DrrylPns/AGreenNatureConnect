import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    const session = await getAuthSession()

    try {
        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id,
                role: "USER"
            },
            include: {
                Community: true
            }
        })

        const users = await prisma.user.count({
            where: {
                Community: {
                    name: loggedIn?.Community?.name
                }
            }
        })

        return new Response(JSON.stringify(users))

    } catch (error) {
        return new Response('Could not fetch number of users', { status: 500 })
    }
}