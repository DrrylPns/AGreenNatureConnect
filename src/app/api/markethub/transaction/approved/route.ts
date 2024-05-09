import { getAuthSession } from "../../../../../lib/auth";
import prisma from "@/lib/db/db";
import { sendApprovedNotification } from "@/lib/mail";
import { Stocks } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const approvedTransactions = await prisma.transaction.findMany({
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
          include: {
            product: true,
            transaction: true
          }
        }
      }
    })

    return new Response(JSON.stringify(approvedTransactions), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error:', error }))
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
        buyer: true,
        seller: true,
        orderedProducts: {
          include: {
            transaction: true,
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

    if (transaction?.paymentStatus === "Not Paid" && transaction.paymentMethod !== "Abono") {
      return new Response("This order is not paid yet!", {
        status: 402,
      })
    }

    const acceptOrderById = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      include: {
        buyer: true
      },
      data: {
        status: "APPROVED"
      }
    })

    const orderedProduct = await prisma.orderedProducts.findFirst({
      where: {
        transactionId: transactionId
      }
    })

    const stocks = await prisma.stocks.findMany({
      where: {
        productId: orderedProduct?.productId
      },
      include: {
        product: true
      },
      orderBy: {
        expiration: 'desc'
      }
    })
    const currentDate = new Date()

    const notExpiredStocks: Stocks[] | null = stocks.filter(stock => {
      const expirationDate = new Date(stock.expiration);
      return expirationDate >= currentDate;
    });
    for (const orderstock of transaction.orderedProducts) {


      let remainingQuantity = orderstock.quantity; // Variable to keep track of remaining quantity

      // Loop through each not expired stock until you find one with enough quantity
      for (const stock of notExpiredStocks) {
        if (remainingQuantity <= 0) {
          // If remaining quantity is 0 or less, exit the loop
          break;
        }
        if (stock.numberOfStocks >= remainingQuantity) {
          // Subtract the required quantity from the available stock
          await prisma.stocks.update({
            where: {
              id: stock.id
            },
            data: {
              numberOfStocks: {
                decrement: remainingQuantity // Subtract the remaining quantity
              }
            }
          });
          remainingQuantity = 0; // All required quantity has been subtracted
          if (remainingQuantity === 0) {
            break
          }
        } else {
          // If the available stock is less than remaining quantity, deduct available quantity
          await prisma.stocks.update({
            where: {
              id: stock.id
            },
            data: {
              numberOfStocks: 0 // Set the available stock to 0 since all are taken
            }
          });
          remainingQuantity -= stock.numberOfStocks; // Deduct the quantity taken from this stock
        }
      }
    }

    await prisma.notification.create({
      data: {
        type: "APPROVED",
        userId: transaction.buyerId,
        communityId: transaction.sellerId,
        transactionId: transaction.id
      },
    })

    if (transaction.buyer.isNotificationsEnabled) {
      sendApprovedNotification(transaction.buyer.email as string, transaction.id, transaction.seller.name)
    }

    // await Promise.all(
    //   transaction.orderedVariant.map(async (orderedVariant) => {
    //     const { variant, product } = orderedVariant;
    //     const { unitOfMeasurement } = variant;

    //     switch (unitOfMeasurement) {
    //       case 'Kilograms':
    //         await prisma.product.update({
    //           where: { id: product.id },
    //           data: { kilograms: { decrement: variant.variant } },
    //         });
    //         break;
    //       case 'Grams':
    //         await prisma.product.update({
    //           where: { id: product.id },
    //           data: { grams: { decrement: variant.variant } },
    //         });
    //         break;
    //       case 'Pounds':
    //         await prisma.product.update({
    //           where: { id: product.id },
    //           data: { pounds: { decrement: variant.variant } },
    //         });
    //         break;
    //       case 'Pieces':
    //         await prisma.product.update({
    //           where: { id: product.id },
    //           data: { pieces: { decrement: variant.variant } },
    //         });
    //         break;
    //       case 'Packs':
    //         await prisma.product.update({
    //           where: { id: product.id },
    //           data: { packs: { decrement: variant.variant } },
    //         });
    //         break;
    //       default:
    //         // Handle other cases if needed
    //         break;
    //     }
    //   })
    // );

    await prisma.employeeActivityHistory.create({
      data: {
        type: "MARKETHUB_ORDERS",
        transactionId: acceptOrderById.id,
        employeeId: session.user.id,
        amount: acceptOrderById.amount,
        buyer: acceptOrderById.buyer.name + " " + acceptOrderById.buyer.lastName,
        paymentStatus: acceptOrderById.paymentStatus,
        status: acceptOrderById.status,
        typeOfActivity: "Approved the Order"
      }
    })

    revalidatePath('/orders', 'layout')
    revalidatePath('/employee/inventory', 'page')
    return new Response(JSON.stringify(acceptOrderById));
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 })
  }
}