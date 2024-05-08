
import { DeactivateColumn } from '@/app/admin/manage-employees/_components/DeactivateColumn'
import { DataTable } from '@/app/admin/manage-employees/_components/data-table'
import { Card } from '@/components/ui/card'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import { DeactivatedEmployees } from '@/lib/types'
import React from 'react'

const DeactivatedFarmersPage = async () => {
    const session = await getAuthSession()

    const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const employees = await prisma.user.findMany({
        where: {
            role: 'EMPLOYEE',
            Community: {
                id: loggedInUser?.Community?.id
            },
            isDisabled: true,
        },
        include: {
            Community: true
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    const dataForDataTable = employees as unknown as DeactivatedEmployees[]

    return (
        <div className='container mx-auto py-10'>
            <Card className='bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] p-3'>

                <DataTable
                    //@ts-ignore
                    columns={DeactivateColumn}
                    //@ts-ignore
                    data={dataForDataTable}
                    employees={employees}
                    isEmployees
                />
            </Card>
        </div>
    )
}

export default DeactivatedFarmersPage