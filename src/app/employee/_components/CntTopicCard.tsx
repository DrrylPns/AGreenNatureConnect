import { Card, Metric, Text } from '@tremor/react'
import { Loader2 } from 'lucide-react'
import React from 'react'

export const CntUserCard = () => {
    return (
        <Card className="">
            <Text>Total Number of Users</Text>
            <Metric>
                0
            </Metric>
        </Card>
    )
}
