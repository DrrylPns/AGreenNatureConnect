import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const getTransactionByUserId = await prisma.transaction.findMany({
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

        return new Response(JSON.stringify(getTransactionByUserId), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
};

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json()
        const { transactionId } = body

        const transaction = await prisma.transaction.findUnique({
            where: {
              id: transactionId,
            },
            include: {
              orderedVariant: {
                include: {
                  variant: true,
                  product: true,
                },
              },
            },
          });

          if (!transaction || transaction.status !== 'PENDING') {
            return new Response('Invalid transaction or not in PENDING status', {
              status: 400,
            });
          }

        const acceptOrderById = await prisma.transaction.update({
            where:{
                id: transactionId
            },
            data:{
                status: "APPROVED"
            }
        })

        await Promise.all(
            transaction.orderedVariant.map(async (orderedVariant) => {
              const { variant, product } = orderedVariant;
              const { unitOfMeasurement } = variant;
      
              switch (unitOfMeasurement) {
                case 'Kilograms':
                  await prisma.product.update({
                    where: { id: product.id },
                    data: { kilograms: { decrement: variant.variant } },
                  });
                  break;
                case 'Grams':
                  await prisma.product.update({
                    where: { id: product.id },
                    data: { grams: { decrement: variant.variant } },
                  });
                  break;
                case 'Pounds':
                  await prisma.product.update({
                    where: { id: product.id },
                    data: { pounds: { decrement: variant.variant } },
                  });
                  break;
                case 'Pieces':
                  await prisma.product.update({
                    where: { id: product.id },
                    data: { pieces: { decrement: variant.variant } },
                  });
                  break;
                case 'Packs':
                  await prisma.product.update({
                    where: { id: product.id },
                    data: { packs: { decrement: variant.variant } },
                  });
                  break;
                default:
                  // Handle other cases if needed
                  break;
              }
            })
          );

        revalidatePath('/orders', 'layout')
        return new Response(JSON.stringify(acceptOrderById));
    } catch (error) {
        
    }
}