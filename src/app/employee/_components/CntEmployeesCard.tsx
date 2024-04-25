"use client"
import { useQuery } from '@tanstack/react-query'
import { Card, Metric, Text } from '@tremor/react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

export const CntEmployeesCard = () => {
    const { data: cntEmployees, isLoading, isError } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const { data } = await axios.get("api/employee/dashboard/employees")
            return data
        }
    })

    const count = typeof cntEmployees === 'number' ? cntEmployees : null;

    return (
        <Card className="">
            <Text>Total Number of Farmers</Text>
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
