"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { useTotalSalesValueStore } from "@/lib/hooks/useCalculatedRevenue"
import { LatestProduct } from "@/lib/types"
import { calculateTotalSalesValue } from "@/lib/utils"
import { UpdateStocksSchema, UpdateStocksType } from "@/lib/validations/employee/products"
import { Stocks } from "@prisma/client"
import { addDays } from "date-fns"
import { id } from "date-fns/locale"
import { revalidatePath } from "next/cache"
const cron = require('node-cron');


export const fetchAllProducts = async (startDate: Date | null = null, endDate: Date | null = null) => {
    const session = await getAuthSession()
    const nextDayStartDate = startDate ? addDays(startDate, 1) : undefined;
    const nextDayEndDate = endDate ? addDays(endDate, 1) : undefined;
    if (!session) return { error: "Unauthorized" }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    if (!user) return { error: "No user found!" }

    const community = await prisma.community.findFirst({
        where: {
            id: user.Community?.id
        }
    })
    const products = await prisma.product.findMany({
        where: {
            community: {
                name: community?.name
            },
            status: {
                not: "ARCHIVED"
            }
        },
        include: {
            creator: true,
            Stock: true
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    await products.forEach(async (product) => {
        let totalStocksInKg = 0
        let totalStocksInPacks = 0
        let totalStocksInPieces = 0

        const currentDate = new Date()
        const productStockInKg = await prisma.stocks.findMany({
            where: {
                productId: product.id,
                unitOfMeasurement: "Kilograms"
            }
        })
    
        const productStockInPacks = await prisma.stocks.findMany({
            where: {
                productId: product.id,
                unitOfMeasurement: "Packs"
            }
        })
        const productStockInPieces = await prisma.stocks.findMany({
            where: {
                productId: product.id,
                unitOfMeasurement: "Pieces"
            }
        })
        const notExpiredStocksInKg: Stocks[] | null = productStockInKg.filter(stock => {
            const expirationDate = new Date(stock.expiration);
            return expirationDate >= currentDate;
        });

        const notExpiredStocksInPacks: Stocks[] | null = productStockInPacks.filter(stock => {
            const expirationDate = new Date(stock.expiration);
            return expirationDate >= currentDate;
        });
        const notExpiredStocksInPieces: Stocks[] | null = productStockInPieces.filter(stock => {
            const expirationDate = new Date(stock.expiration);
            return expirationDate >= currentDate;
        });

        notExpiredStocksInKg.map((stock) => {
            totalStocksInKg += stock.numberOfStocks
        })
        notExpiredStocksInPacks.map((stock) => {
            totalStocksInPacks += stock.numberOfStocks
        })
        notExpiredStocksInPieces.map((stock) => {
            totalStocksInPieces += stock.numberOfStocks
        })

        await prisma.product.update({
            where: { id: product.id },
            data: {
                quantity: totalStocksInKg,
                quantityIPacks: totalStocksInPacks,
                quantityInPieces: totalStocksInPieces
            },
        });
    })

    const latestProducts = await prisma.product.findMany({
        where: {
            community: {
                name: community?.name
            },
            status: {
                not: "ARCHIVED"
            },
        },
        include: {
            creator: true,
            Stock: true,
            // orderedProducts: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    const modifiedProducts: LatestProduct[] = [];

    for (const product of latestProducts) {
        // Fetch orderedProducts associated with the current product
        const orderedProducts = await prisma.orderedProducts.findMany({
            where: {
                
                transaction: {
                    status: "COMPLETED"
                },
                productId: product.id
            },
            
        });
        if(nextDayStartDate === undefined && nextDayEndDate === undefined){
            const modifiedProduct = {
                ...product,
                orderedProducts: orderedProducts
            };  
            modifiedProducts.push(modifiedProduct);
        }
        if (nextDayStartDate !== undefined && nextDayEndDate === undefined) {
            const filteredOrderedProducts = orderedProducts.filter((prod) => {
                const productDate = new Date(prod.updatedAt).toISOString().split('T')[0];
                const startDate = new Date(nextDayStartDate).toISOString().split('T')[0];
                return  productDate === startDate ;
            });
               // Add the associated orderedProducts to the current product
            const modifiedProduct = {
                ...product,
                orderedProducts: filteredOrderedProducts
            };
        
            // Push the modified product into the modifiedProducts array
            modifiedProducts.push(modifiedProduct);
        }
        if (nextDayStartDate !== undefined && nextDayEndDate !== undefined) {
            const filteredOrderedProducts = orderedProducts.filter((prod) => {
                const productDate = new Date(prod.updatedAt).toISOString().split('T')[0];
                const startDate = new Date(nextDayStartDate).toISOString().split('T')[0];
                const endDate = new Date(nextDayEndDate).toISOString().split('T')[0];
              
                return productDate >= startDate && productDate <= endDate;
            });
            // Add the associated orderedProducts to the current product
            const modifiedProduct = {
                ...product,
                orderedProducts: filteredOrderedProducts
            };
        
            // Push the modified product into the modifiedProducts array
            modifiedProducts.push(modifiedProduct);
        
        }
        
     
    }
   

    const totalSalesValues = await calculateTotalSalesValue(modifiedProducts);
    const sum = totalSalesValues.reduce((acc, curr) => acc + curr, 0);

    const salesRevPercentageCatA = (sum / sum) * 100;

    revalidatePath("/employee/inventory")
    return {modifiedProducts, sum}
}
export const numberOfProducts = async () => {
    const session = await getAuthSession();
    if (!session) return { error: "Unauthorized" };
    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id,
        },
        include: {
            Community: true
        }
    });

    if (!user) return { error: "No user found!" };

    const productsCount = await prisma.product.count({
        where: {
            community: {
                id: user.Community?.id
            },
            status: "APPROVED",
        }
    })

    return productsCount
}
export const fetchProducts = async (startDate: Date | null = null, endDate: Date | null = null) => {
    const session = await getAuthSession();
    const nextDayStartDate = startDate ? addDays(startDate, 1) : undefined;
    const nextDayEndDate = endDate ? addDays(endDate, 1) : undefined;
    if (!session) return { error: "Unauthorized" };

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id

        },
        include: {
            Community: true
        }
    });
 
    if (!user) return { error: "No user found!" };

    const community = await prisma.community.findFirst({
        where: {
            id: user.Community?.id
        }
    });

    // Fetch all products within the specified date range
    const products = await prisma.product.findMany({
        where: {
            community: {
                name: community?.name
            },
            status: {
                not: "ARCHIVED"
            },
            orderedProducts: {
                some: {
                    createdAt: {
                        gte: startDate || undefined,
                        lte: endDate || undefined
                    },
                    transaction: {
                        status: "COMPLETED"
                    }
                },
            }
        },
        include: {
            creator: true,
            Stock: true,
            orderedProducts: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    });

    await products.forEach(async (product) => {
        let totalStocks = 0
        const currentDate = new Date()
       
  
        const productStock = await prisma.stocks.findMany({
            where: {
                productId: product.id,
                unitOfMeasurement: "Kilograms"
            }
        })
        const notExpiredStocks: Stocks[] | null = productStock.filter(stock => {
            const expirationDate = new Date(stock.expiration);
            return expirationDate >= currentDate;
        });
        notExpiredStocks.map((stock) => {
            totalStocks += stock.numberOfStocks
        })
        await prisma.product.update({
            where: { id: product.id },
            data: {
                quantity: totalStocks
            },
        });
    })
   

    const latestProducts = await prisma.product.findMany({
        where: {
            community: {
                name: community?.name
            },
            status: {
                not: "ARCHIVED"
            },
        },
        include: {
            creator: true,
            Stock: true,
            // orderedProducts: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    })
   

    const modifiedProducts: LatestProduct[] = [];

    for (const product of latestProducts) {
        // Fetch orderedProducts associated with the current product
        const orderedProducts = await prisma.orderedProducts.findMany({
            where: {
                transaction: {
                    status: "COMPLETED"
                },
                productId: product.id
            },
            
        });
        if(nextDayStartDate === undefined && nextDayEndDate === undefined){
            const modifiedProduct = {
                ...product,
                orderedProducts: orderedProducts
            };  
            modifiedProducts.push(modifiedProduct);
        }
        if (nextDayStartDate !== undefined && nextDayEndDate === undefined) {
            const filteredOrderedProducts = orderedProducts.filter((prod) => {
                const productDate = new Date(prod.updatedAt).toISOString().split('T')[0];
                const startDate = new Date(nextDayStartDate).toISOString().split('T')[0];
                return  productDate === startDate ;
            });
               // Add the associated orderedProducts to the current product
            const modifiedProduct = {
                ...product,
                orderedProducts: filteredOrderedProducts
            };
        
            // Push the modified product into the modifiedProducts array
            modifiedProducts.push(modifiedProduct);
        }
        if (nextDayStartDate !== undefined && nextDayEndDate !== undefined) {
            const filteredOrderedProducts = orderedProducts.filter((prod) => {
                const productDate = new Date(prod.updatedAt).toISOString().split('T')[0];
                const startDate = new Date(nextDayStartDate).toISOString().split('T')[0];
                const endDate = new Date(nextDayEndDate).toISOString().split('T')[0];
            
                return productDate >= startDate && productDate <= endDate;
            });
            // Add the associated orderedProducts to the current product
            const modifiedProduct = {
                ...product,
                orderedProducts: filteredOrderedProducts
            };
        
            // Push the modified product into the modifiedProducts array
            modifiedProducts.push(modifiedProduct);
        }
        
     
    }
    const filteredProducts = modifiedProducts.filter((product) => {
        return product.orderedProducts.length >= 1;
    });
    
    // Calculate total sales value for each product within the specified date range
    const totalSalesValues = await calculateTotalSalesValue(filteredProducts);

    const sum = totalSalesValues.reduce((acc, curr) => acc + curr, 0);

    // Sort products based on total sales value in descending order
    const sortedProducts = filteredProducts.slice().sort((a, b) => totalSalesValues[filteredProducts.indexOf(b)] - totalSalesValues[filteredProducts.indexOf(a)]);

    // Determine the number of products for each category
    const totalProducts = sortedProducts.length;
    const top20PercentCount = Math.ceil(totalProducts * 0.2);
    const bottom5PercentCount = Math.ceil(totalProducts * 0.05);

    // Get products for each category
    const categoryAProducts = sortedProducts.slice(0, top20PercentCount);
    const categoryBProducts = sortedProducts.slice(top20PercentCount, totalProducts - bottom5PercentCount);
    const categoryCProducts = sortedProducts.slice(totalProducts - bottom5PercentCount);

    const totalSalesValueCatA = await calculateTotalSalesValue(categoryAProducts, startDate, endDate);
    const sumCatA = totalSalesValueCatA.reduce((acc, curr) => acc + curr, 0);
    const totalSalesValueCatB = await calculateTotalSalesValue(categoryBProducts, startDate, endDate);
    const sumCatB = totalSalesValueCatB.reduce((acc, curr) => acc + curr, 0);
    const totalSalesValueCatC = await calculateTotalSalesValue(categoryCProducts, startDate, endDate);
    const sumCatC = totalSalesValueCatC.reduce((acc, curr) => acc + curr, 0);

    const totalSalesRevenue = sumCatA + sumCatB + sumCatC;

    // Calculate sales revenue percentage for each category
    const salesRevPercentageCatA = (sumCatA / totalSalesRevenue) * 100;
    const salesRevPercentageCatB = (sumCatB / totalSalesRevenue) * 100;
    const salesRevPercentageCatC = (sumCatC / totalSalesRevenue) * 100;
    return {
        categoryAProducts,
        categoryBProducts,
        categoryCProducts,
        sum,
        sumCatA,
        sumCatB,
        sumCatC,
        salesRevPercentageCatA,
        salesRevPercentageCatB,
        salesRevPercentageCatC,
    };
};

export const archiveProduct = async (id: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    await prisma.product.update({
        where: { id },
        data: {
            status: "ARCHIVED"
        }
    })

    revalidatePath("/employee/inventory")
    return { success: "Successfully archived the product." }
}

export const unarchiveProduct = async (id: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    await prisma.product.update({
        where: { id },
        data: {
            status: "APPROVED"
        }
    })

    revalidatePath("/employee/archived-products")
    return { success: "Successfully restored the product." }
}

export const fetchArchivedProducts = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const products = await prisma.product.findMany({
        where: { status: "ARCHIVED" },
        include: {
            creator: true,

        },
    })

    if (!products) return { error: "No product found!" }

    return products
}

export const updateStocks = async (id: string | undefined, values: UpdateStocksType) => {
    try {
        const validatedFields = UpdateStocksSchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields" }

        const { quantity, typeOfMeasurement } = validatedFields.data

        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const community = await prisma.community.findFirst({
            where: {
                id: loggedInUser?.Community?.id
            }
        })

        if (loggedInUser?.role !== "EMPLOYEE") return new Response("Error: Unauthorized", { status: 401 })

        const existingProduct = await prisma.product.findUnique({
            where: {
                id,
                communityId: community?.id,
            },
            include: {

            },
        });

        if (!existingProduct) return { error: "Can't update because there is no product found!" }


        await prisma.employeeActivityHistory.create({
            data: {
                type: "MARKETHUB_PRODUCTS",
                employeeId: session.user.id,
                productId: existingProduct.id,
                typeOfActivity: `Added ${quantity + " " + typeOfMeasurement}`
            }
        })

        revalidatePath("/employee/inventory")
        return { success: "Stocks updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const fetchStocks = async (productId: string) => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            products: {
                every: {
                    id: productId
                }
            }
        }
    })
    if (!user) return { error: "No user found!" }

    const stocks = await prisma.stocks.findMany({
        where: {
            product: {
                id: productId
            },

        },
        include: {
            product: true,
        }
    })

    return stocks
}