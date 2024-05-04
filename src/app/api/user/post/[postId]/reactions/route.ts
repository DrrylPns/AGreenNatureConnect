import { getAuthSession } from "../../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { CreateReactionSchema } from "@/lib/validations/reactionSchema";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const postIdWithReacts = url.pathname.split("post/")[1];
    const postId = postIdWithReacts.replace("/reactions", "");

    try {
        const session = await getAuthSession();

        const userId = session?.user.id;

        const userReacted = await prisma.reaction.findFirst({
            where: {
                userId,
                postId,
            },
        });

        return new Response(JSON.stringify({ userReacted: { type: userReacted?.type } }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error fetching reaction status:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { postId, type } = CreateReactionSchema.parse(body)
        const userId = session.user.id

        const existingReaction = await prisma.reaction.findFirst({
            where: {
                postId,
                userId,
            },
        });

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })

        if (!post) return new Response("No post found!")

        if (type === existingReaction?.type) {
            await prisma.reaction.delete({
                where: {
                    id: existingReaction.id
                }
            })

            return new Response("Unreacted to the post")
        }

        if (existingReaction) {
            await prisma.reaction.delete({
                where: {
                    id: existingReaction.id,
                },
            });
        }

        const successReact = await prisma.reaction.create({
            data: {
                userId: userId,
                postId: postId,
                type: type,
            },
        });

        if (successReact) {
            await prisma.notification.create({
                data: {
                    userId: post.authorId,
                    reactionId: successReact.id,
                    type: "REACT",
                }
            })
        }

        revalidatePath(`/api/user/post/${postId}/reactions`);
        return new Response('Reaction added');

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(`Invalid POST request data passed ${error}`, { status: 422 })
        }
        return new Response(`Could not react the post at this time, please try again later ${error}`, { status: 500 })
    }
}