import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

// Getting unique post based on postId
export async function GET(req: NextRequest) {
    const postId = req.url.split("post/")[1];
    try {
        const getPost = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true,
                        replyOnComent: true,
                    },
                },
                likes: true,
                topic: true,
            },
        });

        return new Response(JSON.stringify(getPost));
    } catch (error) {
        return new Response(JSON.stringify({ error }));
    }
}

// Editing post based on postId
export async function PUT(req: NextRequest) {
    const postId = req.url.split("post/")[1];
}

