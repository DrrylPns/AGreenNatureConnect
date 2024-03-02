import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db/db';
import React from 'react'
import OrderTab from '../employee/_components/OrderTab';

const page = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    const loggedIn = await prisma.user.findFirst({
        where: {
            id: session?.user.id,
        },
        include: {
            Community: true
        }
    })

    const pendingTransactions = await prisma.transaction.findMany({
        where: {
            sellerId: loggedIn?.Community?.id,
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

    const approvedTransactions = await prisma.transaction.findMany({
        where: {
            sellerId: loggedIn?.Community?.id,
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

    const pickupTransactions = await prisma.transaction.findMany({
        where: {
            sellerId: loggedIn?.Community?.id,
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

    const cancelledTransactions = await prisma.transaction.findMany({
        where: {
            sellerId: loggedIn?.Community?.id,
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

    const completedTransactions = await prisma.transaction.findMany({
        where: {
            sellerId: loggedIn?.Community?.id,
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

    return (
        <div className=''>
            <OrderTab
                pending={pendingTransactions}
                approved={approvedTransactions}
                pickup={pickupTransactions}
                cancelled={cancelledTransactions}
                completed={completedTransactions}
            />
        </div>
    )
}

export default page