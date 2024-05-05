"use client"
import prisma from '@/lib/db/db'
import React from 'react'
import { DataTable } from '../inventory/_components/data-table'
import { columns } from './_components/columns' 
import { useQuery } from '@tanstack/react-query'
import { EmployeeActivityHistory, Transaction } from '@prisma/client'
import axios from 'axios'

const page = () => {

    const { data: transactions, isFetching } = useQuery({
        queryKey: ['transaction-history'],
        queryFn: async () => {
            const { data } = await axios.get("/api/employee/transactionHistory")
            return data as EmployeeActivityHistory[]
        }
    })

    return (
        <div className='container mx-auto py-10'>
            
            <DataTable 
              //@ts-ignore
            columns={columns}
              
                data={transactions ?? []} isFetching={isFetching} isTransaction />
        </div>
    )
}

export default page