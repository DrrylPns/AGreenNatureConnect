import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db"
import { BlogSchema } from "@/lib/validations/createBlog";
import { z } from "zod"

export async function POST(req: Request) {
    try {

        const session = await getAuthSession()

        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        if (loggedIn?.role !== "EMPLOYEE" || !session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json()

        const { title, content, thumbnail } = BlogSchema.parse(body)

        await prisma.blog.create({
            data: {
                title,
                content,
                thumbnail,
                authorId: session.user.id,
                communityId: loggedIn?.Community?.id as string
            }
        })

        return new Response('OK')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response('Could not create topic', { status: 500 })
    }
}