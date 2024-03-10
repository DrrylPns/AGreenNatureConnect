import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";
import { format, isBefore, isToday, parseISO, set, startOfDay, startOfToday } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { productId, isFree, isFreeUntil } = body;

        let updateData: Record<string, any> = {
            isFree,
        };

        if (isFreeUntil) {
            const isFreeUntilDate = new Date(isFreeUntil);
            const today = startOfToday();  // Import startOfToday from date-fns

            if (isBefore(today, isFreeUntilDate) || isToday(isFreeUntilDate)) {
                updateData.isFree = true;
                updateData.isFreeUntil = isFreeUntilDate;
            } else {
                updateData.isFree = false;
                updateData.isFreeUntil = null;
            }
        } else {
            updateData.isFree = false;
            updateData.isFreeUntil = null;
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