"use client"
import { Card } from '@/components/ui/card'
import React from 'react'
import { DataTable } from '../../inventory/_components/data-table'
import { ColumnRequest } from './ColumnRequest'
import { ProductRequestWithConsignee } from '@/lib/types'

interface Props {
    requests: ProductRequestWithConsignee[]
}

export const ProductRequestTable = ({ requests }: Props) => {

    if (!requests) return <>Error fetching requests</>

    console.log('Requests:', requests)

    return (
        <div>
            <Card className="mx-auto max-w-full h-full drop-shadow-lg p-3 ">

                <DataTable
                    columns={ColumnRequest}
                    //@ts-ignore
                    data={requests ?? []}
                    isSalesReport
                />
            </Card>
        </div>
    )
}
