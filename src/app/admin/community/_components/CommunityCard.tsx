import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/Ui/Card"
import { CommunityPageProps } from '../page'

export const CommunityCard: React.FC<CommunityPageProps> = ({
    id,
    name
}) => {
    return (
        <section className='flex flex-col gap-5 mb-3'>
            <Card className=''>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>Community Description...</CardDescription>
                </CardHeader>
            </Card>
        </section>
    )
}
