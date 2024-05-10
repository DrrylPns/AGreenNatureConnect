"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { ProductWithOrderdProducts } from "@/lib/types"
import { formatDate } from "@/lib/utils"

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

export const fetchSalesByCategories = async (startDate?: Date, endDate?: Date) => {
    const session = await getAuthSession();

    if (!session) return { error: "Unauthorized" };

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true },
    });

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id,
        },
        include: {
            products: true,
        },
    });

    const sales = await prisma.transaction.findMany({
        where: {
            status: "COMPLETED",
            sellerId: community?.id,
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            orderedProducts: {
                include: {
                    product: true,
                },
            },
        },
    });

    const categorySalesMap: Record<string, number> = {};

    // Aggregate sales value by category
    sales.forEach((transaction) => {
        transaction.orderedProducts.forEach((orderedProduct) => {
            const productCategory = orderedProduct.product.category;
            const saleAmount = orderedProduct.totalPrice;

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

    return salesByCategories;
};


export const fetchSalesCountByDate = async (startDate: Date, endDate: Date) => {
    const session = await getAuthSession();

    if (!session) return { error: "Unauthorized" };

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true },
    });

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id
        },
        include: {
            products: true
        }
    });

    const salesByDates = await prisma.transaction.findMany({
        where: {
            status: "COMPLETED",
            sellerId: community?.id,
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            orderedProducts: {
                include: {
                    product: true,
                    transaction: true,
                }
            }
        },
    });

    const salesByDateMap: Record<string, Record<string, number>> = {};

    salesByDates.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        const formattedDate = formatDate(transactionDate);

        // Initialize sales data for the date if it doesn't exist
        if (!salesByDateMap[formattedDate]) {
            salesByDateMap[formattedDate] = {};
        }

        // Aggregate sales count by category for the date
        transaction.orderedProducts.forEach((orderedProduct) => {
            const productCategory = orderedProduct.product.category;

            // Increase count for the category on the date
            salesByDateMap[formattedDate][productCategory] = (salesByDateMap[formattedDate][productCategory] || 0) + 1;
        });
    });

    // Format data for BarChart component
    const salesByDate = Object.entries(salesByDateMap).map(([date, sales]) => ({
        date,
        ...sales,
    }));

    return salesByDate;
};



// export const fetchSalesByDate = async (date: string) => {
//     const session = await getAuthSession()

//     if (!session) return { error: "Unauthorized" }

//     const loggedInUser = await prisma.user.findFirst({
//         where: { id: session.user.id },
//         include: { Community: true }
//     })

//     const community = await prisma.community.findFirst({
//         where: {
//             id: loggedInUser?.Community?.id
//         },
//         include: {
//             products: true
//         }
//     })

//     const salesByDates = await prisma.transaction.findMany({
//         where: {
//             status: "COMPLETED",
//             sellerId: community?.id,
//         },
//         include: {
//             orderedVariant: {
//                 include: {
//                     product: true,
//                     transaction: true,
//                 }
//             }
//         },
//     })

//     const salesByMonthMap: Record<string, Record<string, number>> = {};


//     salesByDates.forEach((transaction) => {
//         const transactionDate = new Date(transaction.createdAt);
//         const transactionMonth = transactionDate.toLocaleString('default', { month: 'short' }); // Get short month name
//         const transactionYear = transactionDate.getFullYear().toString(); // Get full year as string
//         const formattedDate = `${transactionMonth}, ${transactionYear}`;

//         // Initialize sales data for the date if it doesn't exist
//         if (!salesByMonthMap[formattedDate]) {
//             salesByMonthMap[formattedDate] = {};
//         }

//         // Aggregate sales by category for the date
//         transaction.orderedVariant.forEach((orderedVariant) => {
//             const productCategory = orderedVariant.product.category;
//             const saleAmount = orderedVariant.transaction.amount;

//             // Add or update sales amount for the category in the month
//             if (salesByMonthMap[formattedDate][productCategory]) {
//                 salesByMonthMap[formattedDate][productCategory] += saleAmount;
//             } else {
//                 salesByMonthMap[formattedDate][productCategory] = saleAmount;
//             }
//         });
//     });

//     // Format data for BarChart component
//     const salesByMonth = Object.entries(salesByMonthMap).map(([month, sales]) => ({
//         month,
//         ...sales,
//     }));

//     return salesByMonth;
// };

export const fetchMostSoldProduct = async () => {
    const session = await getAuthSession();

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session?.user.id },
        include: { Community: true }
    });

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id
        },
        include: {
            products: {
                include: {}
            },
        },
    });

    const productsWithOrderedProducts = await prisma.product.findMany({
        where: {
            status: "APPROVED",
            communityId: community?.id,
        },
        include: {
            orderedProducts: {
                select: { quantity: true }
            },
            community: true,
            Stock: true,
            reviews: true,
        }
    });

    // Calculate the total quantity sold for each product and add it to the returned object
    const productsWithTotalSold = productsWithOrderedProducts.map(product => ({
        ...product,
        totalSold: product.orderedProducts.reduce((total, { quantity }) => total + quantity, 0)
    }));

    // Sort products by total quantity sold in descending order
    const sortedProducts = productsWithTotalSold.sort((a, b) => b.totalSold - a.totalSold);

    // Return only the top 10 most sold products
    return sortedProducts.slice(0, 10)
};

export const totalNumberOfProducts = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: { Community: true }
    })

    const products = await prisma.product.count({
        where: {
            status: "APPROVED",
            communityId: loggedInUser?.Community?.id
        },
    })

    return products
}

export const salesReport = async (startDate: Date, endDate: Date) => {
    const session = await getAuthSession();

    const loggedInUser = await prisma.user.findFirst({
        where: { id: session?.user.id },
        include: { Community: true },
    });

    const community = await prisma.community.findFirst({
        where: {
            id: loggedInUser?.Community?.id,
        },
        include: {
            products: true,
        },
    });

    const salesByDates = await prisma.transaction.findMany({
        where: {
            status: "COMPLETED",
            sellerId: community?.id,
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            orderedProducts: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    // Initialize variables to store total sales amount and total products sold
    let totalSalesAmount = 0;
    let totalProductsSold = 0;

    // Calculate total sales amount and total products sold
    salesByDates.forEach((transaction) => {
        totalSalesAmount += transaction.amount;
        totalProductsSold += transaction.orderedProducts.length;
    });

    // Return an object containing both the sales data and the computed totals
    return {
        salesData: salesByDates,
        totalSalesAmount,
        totalProductsSold,
    };
};