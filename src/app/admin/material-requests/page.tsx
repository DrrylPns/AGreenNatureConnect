import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { BadgeCheck, Hourglass, XCircle } from 'lucide-react'
import React from 'react'
import { ApprovedMaterials } from './_components/ApprovedMaterials'
import { PendingMaterials } from './_components/PendingMaterials'
import { DeclinedMaterials } from './_components/DeclinedMaterials'

const page = () => {
    return (
        <div className='w-full h-screen'>
            <Tabs defaultValue="pending">
                <TabsList className='w-full flex justify-evenly h-[200px]'>
                    <TabsTrigger value="pending" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <Hourglass className='text-yellow-500 mr-0 md:mr-2' />
                        <div className='hidden md:block'>Pending Materials</div>
                    </TabsTrigger>
                    <TabsTrigger value="approved" className='h-[125px] border border-zinc-300 hover:opacity-80'>
                        <BadgeCheck className='text-[#6ec530] mr-0 md:mr-2' />
                        <div className='hidden md:block'>Approved Materials</div>
                    </TabsTrigger>
                    <TabsTrigger value="declined" className=' h-[125px] border border-zinc-300 hover:opacity-80'>
                        <XCircle className='text-rose-500 mr-0 md:mr-2' />
                        <div className='hidden md:block'>Declined Materials</div>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending">

                    <PendingMaterials />

                </TabsContent>
                <TabsContent value="approved">

                    <ApprovedMaterials />

                </TabsContent>
                <TabsContent value="declined">

                    <DeclinedMaterials />

                </TabsContent>
            </Tabs>

        </div>
    )
}

export default page