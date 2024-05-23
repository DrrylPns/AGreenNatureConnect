import { sendPendingOrderNotification } from "@/lib/mail";
import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { Cart, CartwithProduct, ResultItem } from "@/lib/types";
import { TransactionSchema } from "@/lib/validations/transactionSchema";
import { v4 as uuidv4 } from 'uuid';
import { createCheckOutSession, retrieveCheckOutSession } from "../../../../../actions/paymongo";
import { redirect } from "next/navigation";

function transformItems(Items: CartwithProduct[],): ResultItem[] {
    const result: ResultItem[] = [];

    Items.forEach((item) => {
        const existingItem = result.find((resultItem) => resultItem.communityId === item.communityId);

        if (existingItem) {
            existingItem.products.push({
                productId: item.product.id,
                totalPrice: item.totalPrice,
                name: item.product.name,
                isFree: item.product.isFree,
                kilograms: item.kilograms,
                unitOfMeasurement: item.unitOfMeasurement,
            });
            item.product.isFree ? existingItem.totalPrice += 0 : existingItem.totalPrice += item.totalPrice

        } else {
            const newItem: ResultItem = {
            
                communityId: item.communityId !== null ? item.communityId : "",
                totalPrice: item.product.isFree ? 0 : item.totalPrice,
                products: [{
                    productId: item.product.id,
                    totalPrice: item.totalPrice,
                    name: item.product.name,
                    isFree: item.product.isFree,
                    kilograms: item.kilograms,
                    unitOfMeasurement: item.unitOfMeasurement,
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

        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            include: {
                Community: true
            }
        })

        const community = await prisma.community.findFirst({
            where: { id: loggedInUser?.Community?.id }
        })

        if (!community) {
            return new Response("No community found", { status: 402 })
        }

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
                    paymentMethod: paymentMethod,
                },
            });

            
            await prisma.orderedProducts.createMany({
                data: item.products.map((product)=>({
                    productId: product.productId,
                    priceInKg: product.totalPrice,
                    unitOfMeasurement: product.unitOfMeasurement,
                    quantity: product.kilograms,
                    transactionId: transaction.id,
                    totalPrice: product.totalPrice,
                })
            )})

            await prisma.cart.deleteMany({
                where: {
                    userId: session.user.id,
                    productId: {
                        in: item.products.map((product) => product.productId),
                    },
                },
            });

            await prisma.notification.create({
                data: {
                    type: "PENDING",
                    userId: session.user.id,
                    communityId: community.id,
                    transactionId: transaction.id,
                },
            })

            if (loggedInUser?.isNotificationsEnabled) {
                sendPendingOrderNotification(
                    loggedInUser?.email as string,
                    transaction.id,
                    community.name,
                )
            }
            
            transactions.push(transaction);
        }
        
        if(paymentMethod === 'E-wallet'){
            await createCheckOutSession(transformedItems, transactions)
            const checkoutUrl = await retrieveCheckOutSession(transactions)

            return new Response(JSON.stringify(checkoutUrl))
        }
      


        return new Response(JSON.stringify(transactions));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
