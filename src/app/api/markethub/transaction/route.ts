import { getAuthSession } from "../../../../lib/auth";
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
                variant: item.variant,
            });
            item.variant.product.isFree ? existingItem.totalPrice += 0 : existingItem.totalPrice += item.variant.price

        } else {
            const newItem: ResultItem = {
                communityId: item.communityId,
                totalPrice: item.variant.product.isFree ? 0 : item.variant.price,
                products: [{
                    productId: item.variant.product.id,
                    variant: item.variant,
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
        const { Items, paymentMethod } = body;

        const transformedItems = transformItems(Items);

        const transactions = [];

        for (const item of transformedItems) {
            const referenceId = uuidv4();
            const transaction = await prisma.transaction.create({
                data: {
                    referenceId,
                    amount: item.totalPrice,
                    status: "PENDING",
                    buyerId: session.user.id,
                    sellerId: item.communityId,
                    paymentMethod: paymentMethod
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
                                price: product.variant.price,
                                variantId: product.variant.id,
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
                        in: item.products.map((product) => product.variant.id),
                    },
                },
            });

            /*
            item.products.forEach(async (product)=>{
                if(product.variant.unitOfMeasurement === 'Kilograms'){
                    await prisma.product.update({
                        where:{id: product.productId},
                        data:{kilograms: {decrement: product.variant.variant}}
                    })
                }
                if(product.variant.unitOfMeasurement === 'Grams'){
                    await prisma.product.update({
                        where:{id: product.productId},
                        data:{grams: {decrement: product.variant.variant}}
                    })
                }
                if(product.variant.unitOfMeasurement === 'Pounds'){
                    await prisma.product.update({
                        where:{id: product.productId},
                        data:{pounds: {decrement: product.variant.variant}}
                    })
                }
                if(product.variant.unitOfMeasurement === 'Pieces'){
                    await prisma.product.update({
                        where:{id:product.productId},
                        data:{pieces: {decrement: product.variant.variant}}
                    })
                }
                if(product.variant.unitOfMeasurement === 'Packs'){
                    await prisma.product.update({
                        where:{id: product.productId},
                        data:{packs: {decrement: product.variant.variant}}
                    })
                }
            }) */
            transactions.push(transaction);
        }

        return new Response(JSON.stringify(transactions));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
