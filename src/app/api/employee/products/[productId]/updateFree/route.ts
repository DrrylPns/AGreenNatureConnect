import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";
import { format, isBefore } from 'date-fns';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { productId, isFree, isFreeUntil } = body;

        let updateData: Record<string, any> = {
            isFree,
        };

        if (isFreeUntil) {
            const currentDate = new Date();

            if (isBefore(new Date(isFreeUntil), currentDate)) {
                updateData = {
                    ...updateData,
                    isFree: true,
                    isFreeUntil: null,
                };
            } else {
                updateData = {
                    ...updateData,
                    isFree: false,
                };
            }
        }

        const updateFreeStatus = await prisma.product.update({
            where: {
                id: productId,
            },
            data: updateData,
        });

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        return new Response(`Could not update product: ${error}`, { status: 500 });
    }
}