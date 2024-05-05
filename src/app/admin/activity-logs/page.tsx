
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/Ui/table'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/column'
import ProductLogs from './_components/productLogs/ProductLogs'



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
                    orderedVariant:true
                }
            },
            employee: true,
            transaction: {
                include:{
                    orderedVariant:{
                        include:{
                            product: true,
                            variant: true
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
                    orderedVariant:true
                }
            },
            employee: true,
            transaction: {
                include:{
                    orderedVariant:{
                        include:{
                            product: true,
                            variant: true
                        }
                    }
                }
            },
            },
            orderBy:{
            createdAt: 'desc'
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
                    <TabsTrigger value="orderLogs">Order logs</TabsTrigger>
                    <TabsTrigger value="productLogs">Product logs</TabsTrigger>
                </TabsList>
                <TabsContent value="orderLogs">
                    <div className="">
                        <DataTable columns={columns} data={orderLogs} />
                    </div>
                </TabsContent>
                <TabsContent value="productLogs">
                    <ProductLogs
                    //@ts-ignore 
                    productLogs={productLogs}/>
                </TabsContent>
            </Tabs>
            
        </div>
    )
}

export default page