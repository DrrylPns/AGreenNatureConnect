"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"

export const fetchSales = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true }
    })

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id
        }
    })

    const sales = await prisma.transaction.count({
        where: {
            sellerId: community?.id,
            status: "COMPLETED"
        }
    })

    return sales
}

export const fetchSalesByCategories = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true }
    })

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id
        },
        include: {
            products: true
        }
    })

    const sales = await prisma.transaction.findMany({
        where: {
            status: "COMPLETED",
            sellerId: community?.id,
        },
        include: {
            orderedVariant: {
                include: {
                    product: true,
                    transaction: true,
                }
            }
        },
    })

    const categorySalesMap: Record<string, number> = {};

    sales.forEach((transaction) => {
        transaction.orderedVariant.forEach((orderedVariant) => {
            const productCategory = orderedVariant.product.category;
            const saleAmount = orderedVariant.transaction.amount;
            if (categorySalesMap[productCategory]) {
                categorySalesMap[productCategory] += saleAmount;
            } else {
                categorySalesMap[productCategory] = saleAmount;
            }
        });
    });

    // Format data for DonutChart component
    const salesByCategories = Object.entries(categorySalesMap).map(([category, sales]) => ({
        category,
        sales,
    }));

    return salesByCategories
}

export const fetchSalesByDate = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true }
    })

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id
        },
        include: {
            products: true
        }
    })

    const salesByDates = await prisma.transaction.findMany({
        where: {
            status: "COMPLETED",
            sellerId: community?.id,
        },
        include: {
            orderedVariant: {
                include: {
                    product: true,
                    transaction: true,
                }
            }
        },
    })

    const salesByDateMap: Record<string, Record<string, number>> = {};

    salesByDates.forEach((transaction) => {
        const transactionDate = transaction.createdAt.toDateString(); // Extract date part only

        // Initialize sales data for the date if it doesn't exist
        if (!salesByDateMap[transactionDate]) {
            salesByDateMap[transactionDate] = {};
        }

        // Aggregate sales by category for the date
        transaction.orderedVariant.forEach((orderedVariant) => {
            const productCategory = orderedVariant.product.category;
            const saleAmount = orderedVariant.transaction.amount;

            // Add or update sales amount for the category on the date
            if (salesByDateMap[transactionDate][productCategory]) {
                salesByDateMap[transactionDate][productCategory] += saleAmount;
            } else {
                salesByDateMap[transactionDate][productCategory] = saleAmount;
            }
        });
    });

    // Format data for BarChart component
    const salesByDate = Object.entries(salesByDateMap).map(([date, sales]) => ({
        date,
        ...sales,
    }));

    return salesByDate;
};