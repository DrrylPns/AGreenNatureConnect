import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db"
import { BlogSchema } from "@/lib/validations/createBlog";
import { z } from "zod"

export async function POST(req: Request) {
    try {

        const session = await getAuthSession()

        if (!session?.user || session?.user.role !== "EMPLOYEE" || session?.user.role !== "ADMIN") {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json()

        const { title, content } = BlogSchema.parse(body)

        await prisma.blog.create({
            data: {
                title,
                content,
                authorId: session.user.id,
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