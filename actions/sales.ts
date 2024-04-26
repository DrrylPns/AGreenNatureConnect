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

export const fetchSalesByDate = async (filter: string) => {
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

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    // Determine start and end dates based on filter value
    switch (filter) {
        case "lastWeek": {
            const today = new Date();
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6); // Start date is 7 days ago
            endDate = new Date(); // End date is today
            break;
        }
        case "lastMonth": {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month
            startDate = firstDayOfMonth;
            endDate = lastDayOfMonth;
            break;
        }
        case "currentYear": {
            const today = new Date();
            startDate = new Date(today.getFullYear(), 0, 1); // Start date is first day of current year
            endDate = new Date(today.getFullYear(), 11, 31); // End date is last day of current year
            break;
        }
        default: {
            // If filter is not provided or not recognized, fetch all data
            startDate = undefined;
            endDate = undefined;
            break;
        }
    }

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
            orderedVariant: {
                include: {
                    product: true,
                    transaction: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        },
    });

    const salesByMonthMap: Record<string, Record<string, number>> = {};

    salesByDates.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        let formattedDate: string;

        switch (filter) {
            case "lastWeek": {
                const date = transactionDate.getDate();
                const month = transactionDate.getMonth() + 1;
                const year = transactionDate.getFullYear() % 100;
                console.log("Date:", date, "Month:", month, "Year:", year); // Add logging
                formattedDate = `${month}/${date}/${year}`;
                break;
            }
            case "lastMonth": {
                const date = String(transactionDate.getDate()).padStart(2, '0');
                const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
                const year = String(transactionDate.getFullYear() % 100);
                console.log("Date:", date, "Month:", month, "Year:", year); // Add logging
                formattedDate = `${month}/${date}/${year}`;
                break;
            }
            default: {
                const transactionMonth = transactionDate.toLocaleString('default', { month: 'short' });
                const transactionYear = transactionDate.getFullYear().toString();
                formattedDate = `${transactionMonth}, ${transactionYear}`;
                break;
            }
        }

        if (!salesByMonthMap[formattedDate]) {
            salesByMonthMap[formattedDate] = {};
        }

        transaction.orderedVariant.forEach((orderedVariant) => {
            const productCategory = orderedVariant.product.category;
            const saleAmount = orderedVariant.transaction.amount;

            if (salesByMonthMap[formattedDate][productCategory]) {
                salesByMonthMap[formattedDate][productCategory] += saleAmount;
            } else {
                salesByMonthMap[formattedDate][productCategory] = saleAmount;
            }
        });
    });

    // this is correct if the case is currentYear selected
    const salesByMonth = Object.entries(salesByMonthMap).map(([month, sales]) => ({
        month,
        ...sales,
    }));

    return salesByMonth;
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
                    orderedVariant: {
                        include: {
                            transaction: true
                        },
                    },
                },
            },
        },
    })

    const product = await prisma.product.findMany({
        where: {
            communityId: loggedInUser?.Community?.id,
            status: "APPROVED",
        },
        take: 10,
        include: {
            orderedVariant: {
                where: {
                    transaction: {
                        status: "COMPLETED"
                    },
                },
            },
        },
        orderBy: {
            orderedVariant: {
                _count: "desc"
            },
        },
    })


    return product
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