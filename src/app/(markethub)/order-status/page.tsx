
import OrderTab from "../components/OrderTab";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import prisma from "@/lib/db/db";
import { getAuthSession } from "../../../lib/auth";

async function page() {
    const session = await getAuthSession()

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const Pending = await prisma.transaction.findMany({
        where: {
            buyerId: session.user.id,
            status: "PENDING"
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            buyer: true,
            seller: true,
            orderedProducts: {
                include:{
                    product: true
                }
            }
           
        }
    });

    const Approved = await prisma.transaction.findMany({
        where: {
            buyerId: session.user.id,
            status: "APPROVED"
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            buyer: true,
            seller: true,
            orderedProducts: {
                include:{
                    product: true
                }
            }
           
        }
    })

    const Pickup = await prisma.transaction.findMany({
        where: {
            buyerId: session.user.id,
            status: "PICK_UP"
        },
        orderBy: {
            updatedAt: 'asc'
        },
        include: {
            buyer: true,
            seller: true,
            orderedProducts: {
                include:{
                    product: true
                }
            }
           
        }
    })

    const Completed = await prisma.transaction.findMany({
        where: {
            buyerId: session.user.id,
            status: "COMPLETED"
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            buyer: true,
            seller: true,
            orderedProducts: {
                include:{
                    product: true
                }
            }
        }
    });

    const Cancelled = await prisma.transaction.findMany({
        where: {
            buyerId: session.user.id,
            status: "CANCELLED"
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            buyer: true,
            seller: true,
            orderedProducts: {
                include:{
                    product: true
                }
            }
           
        }
    })

    return (
        <div>
            <OrderTab
                //@ts-ignore
                pending={Pending}
                //@ts-ignore
                approved={Approved}
                //@ts-ignore
                pickup={Pickup}
                //@ts-ignore
                cancelled={Cancelled}
                //@ts-ignore
                completed={Completed}
            />
        </div>
    )
}

export default page