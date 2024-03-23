import { Card, Metric, Text } from '@tremor/react'
import React from 'react'
import { fetchSales } from '../../../../actions/sales'

const CntSales = async () => {

    const sales = await fetchSales()

    if (!sales) return <>Error Fetching Sales.</>

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