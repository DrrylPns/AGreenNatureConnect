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

        },
    });

    const categorySalesMap: Record<string, number> = {};


    // Format data for DonutChart component
    const salesByCategories = Object.entries(categorySalesMap).map(([category, sales]) => ({
        category,
        sales,
    }));

    return salesByCategories;
};


export const fetchSalesByDate = async (startDate: Date, endDate: Date) => {
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


        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const salesByDate: Record<string, Record<string, number>> = {};

    salesByDates.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        const formattedDate = transactionDate.toISOString().slice(0, 10); // Group by date

        if (!salesByDate[formattedDate]) {
            salesByDate[formattedDate] = {};
        }

    });

    // Convert the sales data to the required format
    const salesData = Object.entries(salesByDate).map(([date, sales]) => ({
        date,
        ...sales,
    }));

    return salesData;
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
            products: {
                include: {

                },
            },
        },
    })

    const products = await prisma.product.findMany({
        where: {
            communityId: loggedInUser?.Community?.id,
            status: "APPROVED",
        },
        include: {
            Stock: true,
            community: true,
            reviews: true,
        }
    })

    // Sort products by the number of units sold (orderedVariant count) in descending order


    return products.slice(0, 10); // Return the top 10 most sold products
}

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
    const session = await getAuthSession()

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


        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return salesByDates
}