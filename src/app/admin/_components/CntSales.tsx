"use client"
import { Card, Metric, Text } from '@tremor/react'
import React from 'react'

const CntSales = () => {
    return (
        <Card className="">
            <Text>Total Number of Sales</Text>
            <Metric>
                0
            </Metric>
        </Card>
    )
}

export default CntSales