import prisma from "@/lib/db/db";
import { UpdatePostSchema } from "@/lib/validations/createPostSchema";
import { z } from "zod";
import { getAuthSession } from "../../../../lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session) {
            return new Response("No user found!", { status: 401 })
        }

        const body = await req.json()

        const { title, content, id } = UpdatePostSchema.parse(body)

        const existingPost = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!existingPost) {
            return new Response("Post not found", { status: 404 })
        }

        if (existingPost.authorId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
            }
        });

        return new Response("Post updated!");
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response(error, { status: 500 })
    }
}