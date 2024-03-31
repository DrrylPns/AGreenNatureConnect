"use client"
import { useQuery } from '@tanstack/react-query'
import { Card, Metric, Text } from '@tremor/react'
import { fetchSales } from '../../../../actions/sales'

const CntSales = () => {

    const { data: sales } = useQuery({
        queryKey: ["sales"],
        queryFn: () => fetchSales()
    })

    return (
        <Card className="">
            <Text>Total Number of Sales</Text>
            <Metric>
                {sales as number}
            </Metric>
        </Card>
    )
}

export default CntSales