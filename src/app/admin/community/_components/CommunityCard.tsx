import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/Ui/Card"
import { CommunityWithUser } from '../page'
import { User } from '@prisma/client';
import { Separator } from '@/app/components/Ui/Separator';

interface CommunityCardProps {
    name: string;
    user: User | null
}

export const CommunityCard = ({
    name,
    user,
}: CommunityCardProps) => {

    return (
        <section className='flex flex-col gap-5 mb-3'>
            <Card className='max-w-2xl'>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>Community Master: {user?.name}</CardDescription>
                    <CardContent>
                        {/* DITO NIYO LAGAY DESIGN UI/UX */}
                        {/* TODO: Add more attributes sa community */}
                        <Separator className='my-3' />
                        <p className='text-muted-foreground text-sm'>
                            Card Description....
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis et reprehenderit sit illum natus! Repellat qui atque laudantium soluta dicta!
                        </p>
                    </CardContent>
                </CardHeader>
            </Card>
        </section>
    )
}
