"use client"

import { Products } from '@/app/employee/inventory/_components/columns'
import { DataTable } from '@/app/employee/inventory/_components/data-table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { columns } from './_components/columns'


const page = () => {
    const { data: products, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios.get("/api/employee/products")
            return data as Products[]
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={products ?? []} isFetching={isFetching} isAdmin />
        </div>
    )
}

export default page