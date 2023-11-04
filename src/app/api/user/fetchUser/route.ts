import { NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";

export async function GET() {

        const session = await getAuthSession();
        if(!session) {
            return new Response("Unauthorized", {status: 401})
        }
        
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            include: {
                Account: true,
            },
        });
        if(!user){
            return new Response("Error: user not found", {status: 404})
        }

        return user
}