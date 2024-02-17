import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import OrderTab from "../components/OrderTab";




async function page() {
    const session = await getAuthSession();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const pendingTransactions = await prisma.transaction.findMany({
        where:{
            buyerId: session.user.id,
            status: "PENDING"
        },
        orderBy:{
            updatedAt: 'desc'
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant: {
                include:{
                    product: true,
                    variant: true
                }
            }
        }
    });
    const approvedTransactions = await prisma.transaction.findMany({
        where:{
            buyerId: session.user.id,
            status: "APPROVED"
        },
        orderBy:{
            updatedAt: 'desc'
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant: {
                include:{
                    product: true,
                    variant: true
                }
            }
        }
    })
    const pickupTransactions = await prisma.transaction.findMany({
        where:{
            buyerId: session.user.id,
            status: "PICK_UP"
        },
        orderBy:{
            updatedAt: 'desc'
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant: {
                include:{
                    product: true,
                    variant: true
                }
            }
        }
    })
    const cancelledTransactions = await prisma.transaction.findMany({
        where:{
            buyerId: session.user.id,
            status: "CANCELLED"
        },
        orderBy:{
            updatedAt: 'desc'
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant: {
                include:{
                    product: true,
                    variant: true
                }
            }
        }
    })
    const completedTransactions = await prisma.transaction.findMany({
        where:{
            buyerId: session.user.id,
            status: "COMPLETED"
        },
        orderBy:{
            updatedAt: 'desc'
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant: {
                include:{
                    product: true,
                    variant: true
                }
            }
        }
    });
    
  return (
     <div>
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