
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
            orderedVariant: {
                include: {
                    product: true,
                    variant: true
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
            orderedVariant: {
                include: {
                    product: true,
                    variant: true
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
            orderedVariant: {
                include: {
                    product: true,
                    variant: true
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
            orderedVariant: {
                include: {
                    product: true,
                    variant: true
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
            orderedVariant: {
                include: {
                    product: true,
                    variant: true
                }
            }
        }
    })



    // const {data: Pending} = useQuery({
    //     queryKey: ['pending'],
    //     queryFn: async() =>{
    //         const res = await axios.get(`/api/markethub/transaction/pending`)

    //         return res.data
    //     }
    // })
    // const {data: Approved} = useQuery({
    //     queryKey: ['pending'],
    //     queryFn: async() =>{
    //         const res = await axios.get(`/api/markethub/transaction/approved`)

    //         return res.data
    //     }
    // })
    // const {data: Pickup} = useQuery({
    //     queryKey: ['pending'],
    //     queryFn: async() =>{
    //         const res = await axios.get(`/api/markethub/transaction/pickUp`)

    //         return res.data
    //     }
    // })
    // const {data: Cancelled} = useQuery({
    //     queryKey: ['pending'],
    //     queryFn: async() =>{
    //         const res = await axios.get(`/api/markethub/transaction/cancelled`)

    //         return res.data
    //     }
    // })
    // const {data: Completed} = useQuery({
    //     queryKey: ['pending'],
    //     queryFn: async() =>{
    //         const res = await axios.get(`/api/markethub/transaction/completed`)

    //         return res.data
    //     }
    // })
    return (
        <div>
            <OrderTab
                pending={Pending}
                approved={Approved}
                pickup={Pickup}
                cancelled={Cancelled}
                completed={Completed}
            />
        </div>
    )
}

export default page