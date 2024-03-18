import prisma from '@/lib/db/db'
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { type, postId } = body
        console.log("Post ID:" + postId);

        const reactions = await prisma.reaction.findMany({
            where: {
                postId,
                type,
            }, include: {
                user: true
            }
        })

        return new Response(JSON.stringify(reactions));
    } catch (error) {
        return new Response(`Could not fetch reactions ${error}`, { status: 500 })
    }
}