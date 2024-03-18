import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { UpdateBlogSchema } from "@/lib/validations/createBlog";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user.role || session?.user.role !== "EMPLOYEE") {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json()

        const { id, title, content, thumbnail } = UpdateBlogSchema.parse(body)

        const existingBlog = await prisma.blog.findFirst({
            where: {
                id
            }
        })

        if (!existingBlog) {
            return new Response("Blog not found", { status: 404 })
        }

        if (existingBlog.authorId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                thumbnail,
                content,
            }
        });

        return new Response("OK");
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response(error, { status: 500 })
    }
}