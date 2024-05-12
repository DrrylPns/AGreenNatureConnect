import { getAuthSession } from "../../../../lib/auth"
import prisma from "@/lib/db/db"
import { revalidatePath } from "next/cache"

export async function GET(req: Request) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        const getShippingInfo = await prisma.shippingInfo.findFirst({
            where: {
                userId: session.user.id
            }
        })

        return new Response(JSON.stringify(getShippingInfo), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        const { data } = await req.json()

        // Check if shipping info already exists for the user
        const existingShippingInfo = await prisma.shippingInfo.findFirst({
            where: {
                userId: session.user.id,
            },
        });

        if (existingShippingInfo) {
            // If exists, update the existing entry
            const updatedShippingInfo = await prisma.shippingInfo.update({
                where: {
                    id: existingShippingInfo.id,
                },
                data: {
                    name: data.name,
                    address: data.address,
                    phoneNumber: data.contactNumber,
                    facebook: data.facebook,
                    email: data.email,
                    blk: data.blk,
                    street: data.street,
                    zip: data.zip,
                },
            });

            return new Response(JSON.stringify(updatedShippingInfo), { status: 200 });
        } else {
            // If doesn't exist, create a new entry
            const createShippingInfo = await prisma.shippingInfo.create({
                data: {
                    userId: session.user.id,
                    name: data.name,
                    address: data.address,
                    phoneNumber: data.contactNumber,
                    facebook: data.facebook,
                    email: data.email,
                    blk: data.blk,
                    street: data.street,
                    zip: data.zip,
                },
            });
            revalidatePath(`/cart/checkout`, 'page')
            return new Response(JSON.stringify(createShippingInfo), { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}