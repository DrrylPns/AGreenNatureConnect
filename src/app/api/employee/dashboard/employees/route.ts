import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    const session = await getAuthSession()

    try {

        // get the loggedIn user first, to get the community include it
        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id,
            },
            include: {
                Community: true
            }
        })

        const cntUsers = await prisma.community.count({
            where: {
                name: loggedIn?.Community?.name,
                user: {
                    role: "EMPLOYEE"
                }
            }
        })

        return new Response(JSON.stringify(cntUsers))

    } catch (error) {
        return new Response('Could not fetch number of users', { status: 500 })
    }
}