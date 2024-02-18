"use client"
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Separator } from '@/app/components/Ui/Separator'
import { VideoTutorials } from './_components/VideoTutorials'
import { PopoverVideo } from './_components/PopoverVideo'
import { useState } from 'react'

const page = () => {
    const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
    const handleSelectCommunity = (communityId: string) => {
        setSelectedCommunity(communityId);
    };

    return (
        <div className='w-full h-full max-md:mt-5 overflow-hidden'>
            <div className='h-screen'>
                <div className='flex justify-between max-sm:flex-col max-sm:items-center max-sm:mb-3'>
                    <div className='text-4xl font-bold mb-7 pr-0'>Video Tutorials</div>
                    <div>
                        <PopoverVideo onSelectCommunity={handleSelectCommunity} />
                    </div>
                </div>
                <p className='text-muted-foreground'>Engage with visual guides and step-by-step tutorials, providing hands-on demonstrations for implementing urban farming techniques effectively.</p>

                <Tabs defaultValue="videotutorial" className="flex gap-3 mt-7 flex-col max-md:hidden" >
                    <TabsList className='flex gap-3 w-full justify-evenly h-11'>
                        <TabsTrigger value="videotutorial" >Video Tutorial</TabsTrigger>
                        <TabsTrigger value="learningmats" asChild>
                            <Link
                                href={"/learningMaterials"}
                            >
                                Learning Materials
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="blog" asChild>
                            <Link href={"/blogs"}>
                                Blogs
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="articles" asChild>
                            <Link href={"/article"}>
                                Articles
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="videotutorial">
                        <VideoTutorials selectedCommunity={selectedCommunity} />
                    </TabsContent>
                    <TabsContent value="learningmats">

                    </TabsContent>
                    <TabsContent value="blog">

                    </TabsContent>
                    <TabsContent value="articles">

                    </TabsContent>
                </Tabs>

                {/* MOBILE VIEW */}
                <div className='md:hidden'>
                    <Separator className='my-3' />
                    <VideoTutorials selectedCommunity={selectedCommunity} />
                    <div className='h-[32px]' />
                </div>
            </div>
        </div>
    )
}

export default page