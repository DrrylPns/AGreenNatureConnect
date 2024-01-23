import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import React from 'react'
import SearchEmployees from '../_components/SearchEmployees'
import { cn, formatDate } from '@/lib/utils'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/Ui/Button'
import { Plus } from 'lucide-react'
import { Employees, columns } from './_components/columns'
import { DataTable } from './_components/data-table'

const page = async () => {

    const session = await getAuthSession()

    const community = await prisma.community.findFirst({
        where: {
            userId: session?.user.id
        },
        include: {
            user: true,
            products: true,
            blogs: true,
            articles: true,
        }
    })

    // console.log(community)

    const employees = await prisma.user.findMany({
        where: {
            role: 'EMPLOYEE',
            Community: {
                name: community?.name
            }
        },
        include: {
            Community: true
        }
    })

    const dataForDataTable = employees as unknown as Employees[]

    return (
        <div className="container mx-auto py-10">
            {/* 1st code tremor table----> */}

            {/* <Card className='bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4]'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <Title className='text-[50px] mb-7 mt-3'>Employees</Title>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <Link className={cn(buttonVariants({
                            variant: "newGreen"
                        }),
                            "bg-[#15A2D4] ml-4 px-7"
                        )}
                            href={"/admin/add-employee"}
                        >
                            <Plus strokeWidth={"1.5"} className='mr-1' width={16} height={16} />
                            Employee
                        </Link>
                    </div>
                </div>
                <SearchEmployees employees={employees} />
            </Card>

            <Card className='bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] mt-11'>
                
            </Card> */}

            {/* shadcn table ----> */}
            <Card className='bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4]'>
                <DataTable columns={columns} data={dataForDataTable} employees={employees} isEmployees />
            </Card>
        </div>
    )
}

export default page