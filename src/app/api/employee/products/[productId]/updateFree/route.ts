import prisma from "@/lib/db/db";
import { NextRequest } from "next/server";
import { format, isBefore, isToday, parseISO, set, startOfDay, startOfToday } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await getAuthSession()


    if (!session?.user || session?.user.role !== "EMPLOYEE") {
        return new Response("Unauthorized", { status: 401 })
    }
    try {
        const body = await req.json();

        const { productId, isFree, isFreeUntil } = body;

        let updateData: Record<string, any> = {
            isFree,
        };

        let tomorrow = new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

        // if (isFreeUntil) {
        //     const isFreeUntilDate = new Date(isFreeUntil);
        //     const today = startOfToday();  // Import startOfToday from date-fns
            
        //     if (isBefore(today, isFreeUntilDate) || isToday(isFreeUntilDate)) {
        //         updateData.isFree = true;
        //         updateData.isFreeUntil = tomorrow;
        //     } else {
        //         updateData.isFree = false;
        //         updateData.isFreeUntil = null;
        //     }
        // } else {
        //     updateData.isFree = false;
        //     updateData.isFreeUntil = null;
        // }

        const updateFreeStatus = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                isFree,
                isFreeUntil: tomorrow,
            }
        });

        console.log(updateFreeStatus)

        await prisma.employeeActivityHistory.create({
            data:{
              type: "MARKETHUB_PRODUCTS",
              employeeId: session.user.id,
              productId: updateFreeStatus.id,
              typeOfActivity: `Made the ${updateFreeStatus.name} free`
            }
        })

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        return new Response(`Could not update product: ${error}`, { status: 500 });
    }
}