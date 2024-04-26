"use client"
import { useQuery } from '@tanstack/react-query'
import { Card, Metric, Text } from '@tremor/react'
import { totalNumberOfProducts } from '../../../../actions/sales'

const CntProducts = () => {

    const { data: products } = useQuery({
        queryKey: ["numberOfProducts"],
        queryFn: () => totalNumberOfProducts()
    })

    return (
        <Card className="">
            <Text>Total Number of Products</Text>
            <Metric>
                {products as number}
            </Metric>
        </Card>
    )
}

export default CntProducts