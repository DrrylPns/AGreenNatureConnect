import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db/db'
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const postIdWithReacts = url.pathname.split("post/")[1];
    const postId = postIdWithReacts.replace("/reactions", "");

    try {
        const session = await getAuthSession()
        const body = await req.json()

        const { type, postId } = body
        console.log('Type:', type);

        const userId = session?.user.id

        const reactions = await prisma.reaction.findMany({
            where: {
                userId,
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