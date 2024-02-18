import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { BadgeCheck, Hourglass, XCircle } from 'lucide-react'
import React from 'react'
import { ApprovedVideo } from './_components/ApprovedVideo'
import { PendingVideo } from './_components/PendingVideo'
import { DeclinedVideo } from './_components/DeclinedVideo'

const page = () => {
    return (
        <div className='w-full h-screen'>
            <Tabs defaultValue="pending">
                <TabsList className='w-full flex justify-evenly h-[200px]'>
                    <TabsTrigger value="approved" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <BadgeCheck className='text-[#6ec530] mr-2' />
                        Approved Videos
                    </TabsTrigger>
                    <TabsTrigger value="pending" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <Hourglass className='text-yellow-500 mr-2' />
                        Pending Videos
                    </TabsTrigger>
                    <TabsTrigger value="declined" className=' h-[125px] border border-zinc-300 hover:opacity-80'>
                        <XCircle className='text-rose-500 mr-2' />
                        Declined Videos
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="approved">

                    <ApprovedVideo />

                </TabsContent>
                <TabsContent value="pending">

                    <PendingVideo />

                </TabsContent>
                <TabsContent value="declined">

                    <DeclinedVideo />

                </TabsContent>
            </Tabs>

        </div>
    )
}

export default page