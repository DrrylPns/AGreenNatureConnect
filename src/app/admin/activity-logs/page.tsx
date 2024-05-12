
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/Ui/table'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/column'
import ProductLogs from './_components/productLogs/ProductLogs'
import DiscussionLogs from './_components/discussionLogs/DiscussionLogs'
import MaterialsLogs from './_components/materialsLogs/MaterialsLogs'
import Stocks from './_components/stocks/Stocks'

export const dynamic = 'force-dynamic';

const page = async() => {
    const session = await getAuthSession()
    
    if (!session?.user) {
        return ({ status: 401 });
    }
    const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const orderLogs = await prisma.employeeActivityHistory.findMany({
        where: {
            employee:{
                communityId:loggedInUser?.Community?.id,
            },
            type: "MARKETHUB_ORDERS",
        },
        include: {
            product:{
                include:{
                    orderedProducts:true
                }
            },
            employee: true,
            transaction: {
                include:{
                    orderedProducts:{
                        include:{
                            product: true,
                            transaction: true
                        }
                    }
                }
            },
            },
            orderBy:{
            createdAt: 'desc'
            }
    })

    const productLogs = await prisma.employeeActivityHistory.findMany({
        where: {
            employee:{
                communityId:loggedInUser?.Community?.id,
            },
            type: "MARKETHUB_PRODUCTS",
        },
        include: {
            product:{
                include:{
                    orderedProducts:true
                }
            },
            employee: true,
            transaction: {
                include:{
                    orderedProducts:{
                        include:{
                            product: true,
                            transaction: true
                        }
                    }
                }
            },
            },
            orderBy:{
            createdAt: 'desc'
            }
    })
    // const discussionLogs = await prisma.employeeActivityHistory.findMany({
    //     where: {
    //         employee:{
    //             communityId:loggedInUser?.Community?.id,
    //         },
    //         type: "DISCUSSION",
    //     },
    //     include: {
    //         product:{
    //             include:{
    //                 orderedVariant:true
    //             }
    //         },
    //         employee: true,
    //         transaction: {
    //             include:{
    //                 orderedVariant:{
    //                     include:{
    //                         product: true,
    //                         variant: true
    //                     }
    //                 }
    //             }
    //         },
    //         },
    //         orderBy:{
    //         createdAt: 'desc'
    //         }
    // })
    const materialLogs = await prisma.employeeActivityHistory.findMany({
        where: {
            employee:{
                communityId:loggedInUser?.Community?.id,
            },
            type: "LEARNINGMATERIALS",
        },
        include: {
            blog: true,
            video: true,
            learningMaterial: true,
            product:{
                include:{
                    orderedProducts:true
                }
            },
            employee: true,
            transaction: {
                include:{
                    orderedProducts:{
                        include:{
                            product: true,
                            transaction: true
                        }
                    }
                }
            },
            },
            orderBy:{
            createdAt: 'desc'
            }
    })

    const stockLogs = await prisma.stockLogs.findMany({
        where:{
            product:{
                communityId: loggedInUser?.Community?.id
            }
        },
        include:{
            product: true,
            user: true,
        }
    })


    return (
        <div className="container mx-auto py-10">
           {/* <Tabs defaultValue="Products" className="w-full">
            <TabsList>
                <TabsTrigger value="Products">Inventory Logs</TabsTrigger>
                <TabsTrigger value="Orders">Orders Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="Products">
                <Table>
                    <TableCaption>A list of your recent inventory logs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Ordered</TableHead>
                            <TableHead className="">Amount</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">Buyer</TableHead>
                            <TableHead className="">Status Modified by</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderLogs.map((log)=>(
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">{log.transaction?.orderedVariant.map((variant)=>(
                                    <div key={variant.id}>
                                        <span className=''>{variant.product.name}</span>
                                        <span className='ml-3'>{variant.variant.variant} {variant.variant.unitOfMeasurement} (x{variant.quantity})</span>
                                    </div>
                                ))}</TableCell>
                                <TableCell>₱ {log.amount}</TableCell>
                                <TableCell>{log.status}</TableCell>
                                <TableCell className="">{log.buyer}</TableCell>
                                <TableCell className="">{log.employee.name + " " + log.employee.lastName}</TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="Orders">
                <Table>
                    <TableCaption>A list of your recent inventory logs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
            </Tabs> */}
            <Tabs defaultValue="orderLogs" className="w-full">
                <TabsList>
                    <TabsTrigger value="orderLogs">Order</TabsTrigger>
                    <TabsTrigger value="productLogs">Product</TabsTrigger>
                    {/* <TabsTrigger value="discussionLogs">Discussion</TabsTrigger> */}
                    <TabsTrigger value="materialsLogs">Materials</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks</TabsTrigger>
                </TabsList>
                <TabsContent value="orderLogs">
                    <div className="">
                 
                        <DataTable
                        //@ts-ignore 
                        columns={columns} data={orderLogs} />
                    </div>
                </TabsContent>
                <TabsContent value="productLogs">
                    <ProductLogs
                    //@ts-ignore 
                    productLogs={productLogs}/>
                </TabsContent>
                {/* <TabsContent value="discussionLogs">
                    <DiscussionLogs
                    //@ts-ignore 
                    discussionLogs={discussionLogs}/>
                </TabsContent> */}
                <TabsContent value="materialsLogs">
                    <MaterialsLogs
                    //@ts-ignore 
                    materialsLogs={materialLogs}/>
                </TabsContent>
                <TabsContent value="stocks">
                    <Stocks
                    //@ts-ignore 
                    stockLogs={stockLogs}/>
                </TabsContent>
            </Tabs>
            
        </div>
    )
}

export default page