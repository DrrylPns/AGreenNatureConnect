import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";

// Getting unique post based on postId
export async function GET(req: NextRequest) {
    const commentId = req.url.split("comments/")[1];
    try {
        const getComment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                author: true,
                replies: {
                    include: {
                        author: true,
                    },
                },
            },
        });

        return new Response(JSON.stringify(getComment));
    } catch (error) {
        return new Response(JSON.stringify({ error }));
    }
}


export async function PUT(req: NextRequest) {
    const commentId = req.url.split("comments/")[1];

}


