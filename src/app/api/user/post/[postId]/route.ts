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
    // Implement your logic for updating the post
}

// Deleting Post
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    console.log(`this is your Id: ${postId}`);

    try {
        const deletePost = await prisma.post.delete({
            where: {
                id: postId as string,
            },
        });

        console.log(deletePost);
        return new Response(JSON.stringify(deletePost), { status: 200 });
    } catch (error) {
        console.error(error);

        // Handle the case when the post does not exist
      
        return new Response('Internal Server Error', { status: 500 });
    }
}
