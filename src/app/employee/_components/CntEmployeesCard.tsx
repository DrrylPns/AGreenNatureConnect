import { Card, Metric, Text } from '@tremor/react'
import React from 'react'

export const CntEmployeesCard = () => {
    return (
        <Card className="">
            <Text>Total Number of Employees</Text>
            <Metric>
                0
            </Metric>
        </Card>
    )
}
