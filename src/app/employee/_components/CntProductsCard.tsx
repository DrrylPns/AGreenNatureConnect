"use client"
import { Card, Metric, Text } from "@tremor/react"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

export const CntProductsCard = () => {
    const { data: cntProducts, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios.get("/api/employee/dashboard/products")
            return data
        }
    })

    const count = typeof cntProducts === 'number' ? cntProducts : null;

    return (
        <Card className="">
            <Text>Products</Text>
            <Metric>
                {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    count !== null ? count : <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
            </Metric>
        </Card>
    )
}