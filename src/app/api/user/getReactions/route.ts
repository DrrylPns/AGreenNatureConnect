import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db/db'
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { type } = body
        console.log('Type:', type);

        const reactions = await prisma.reaction.findMany({
            where: {
                type
            }, include: {
                user: true
            }
        })

        return new Response(JSON.stringify(reactions));
    } catch (error) {
        return new Response(`Could not fetch reactions ${error}`, { status: 500 })
    }
}