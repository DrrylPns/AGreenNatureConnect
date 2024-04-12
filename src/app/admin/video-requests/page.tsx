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
                    <TabsTrigger value="pending" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <Hourglass className='text-yellow-500 mr-0 md:mr-2' />
                        <div className='hidden md:block'>Pending Videos</div>
                    </TabsTrigger>
                    <TabsTrigger value="approved" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <BadgeCheck className='text-[#6ec530] mr-0 md:mr-2' />
                        <div className='hidden md:block'>Approved Videos</div>
                    </TabsTrigger>
                    <TabsTrigger value="declined" className=' h-[125px] border border-zinc-300 hover:opacity-80'>
                        <XCircle className='text-rose-500 mr-0 md:mr-2' />
                        <div className='hidden md:block'>Declined Videos</div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="pending">

                    <PendingVideo />

                </TabsContent>
                <TabsContent value="approved">

                    <ApprovedVideo />

                </TabsContent>
                <TabsContent value="declined">

                    <DeclinedVideo />

                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page