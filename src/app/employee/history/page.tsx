"use client"
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import React from 'react'
import { DataTable } from '../inventory/_components/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import { Transaction } from '@prisma/client'
import axios from 'axios'

const page = () => {

    const { data: transactions, isFetching } = useQuery({
        queryKey: ['transaction-history'],
        queryFn: async () => {
            const { data } = await axios.get("/api/employee/transactionHistory")
            return data as Transaction[]
        }
    })

    return (
        <div className='container mx-auto py-10'>
            <DataTable columns={columns}
                //@ts-ignore
                data={transactions ?? []} isFetching={isFetching} isTransaction />
        </div>
    )
}

export default page