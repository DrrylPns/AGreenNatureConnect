import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { Cart, ResultItem } from "@/lib/types";
import { TransactionSchema } from "@/lib/validations/transactionSchema";
import { v4 as uuidv4 } from 'uuid';

function transformItems(Items: Cart[]): ResultItem[] {
    const result: ResultItem[] = [];
    
    Items.forEach((item) => {
        const existingItem = result.find((resultItem) => resultItem.communityId === item.communityId);
        
        if (existingItem) {
            existingItem.products.push({
                productId: item.variant.product.id,
                variantId: item.variant.id,
            });
        } else {
            const newItem: ResultItem = {
                communityId: item.communityId,
                products: [{
                    productId: item.variant.product.id,
                    variantId: item.variant.id,
                }],
            };
            
            result.push(newItem);
        }
    });
    return result;
}

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { Items } = body;

        const transformedItems = transformItems(Items);
  

        const transactions = [];

        for (const item of transformedItems) {
            const referenceId = uuidv4();
            const transaction = await prisma.transaction.create({
                data: {
                    referenceId,
                    amount: 0,
                    status: "PENDING",
                    buyerId: session.user.id,
                    sellerId: item.communityId,
                },
            });

            await prisma.transaction.update({
                where: {
                    id: transaction.id,
                },
                data: {
                    orderedVariant: {
                        createMany: {
                            data: item.products.map((product) => ({
                                variantId: product.variantId,
                                productId: product.productId,
                            })),
                        },
                    },
                },
            });

            await prisma.cart.deleteMany({
                where: {
                    userId: session.user.id,
                    variantId: {
                        in: item.products.map((product) => product.variantId),
                    },
                },
            });

            transactions.push(transaction);
        }

        return new Response(JSON.stringify(transactions));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
