"use client"
import { useQuery } from '@tanstack/react-query'
import { Card, Metric, Text } from '@tremor/react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React from 'react'

export const CntUserCard = () => {

    const { data: cntUsers, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axios.get("api/employee/dashboard/users")
            return data
        }
    })

    const count = typeof cntUsers === 'number' ? cntUsers : null;

    return (
        <Card className="">
            <Text>Total Number of Users</Text>
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
