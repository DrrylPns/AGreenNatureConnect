"use client"
import Link from 'next/link'
import { InformationImage } from '../components/information-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { ApprovedMaterials } from './_components/ApprovedMaterials'
import { Separator } from '@/app/components/Ui/Separator'
import { PopoverVideo } from '../videotutorial/_components/PopoverVideo'
import { useState } from 'react'

function LearningMaterials() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const handleSelectCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
  };

  return (
    <div className='w-full h-full max-md:mt-5 overflow-hidden'>
      <div className='h-screen'>
        <div className='flex justify-between max-sm:flex-col max-sm:items-center max-sm:mb-3'>
          <div className='text-4xl font-bold mb-7 pr-0'>Learning Materials</div>
          <div>
            <PopoverVideo onSelectCommunity={handleSelectCommunity} />
          </div>
        </div>
        <p className='text-muted-foreground'>Explore detailed PDF resources on urban farming, covering essential concepts and practical guidance for cultivating sustainable urban environments.</p>

        <Tabs defaultValue="learningmats" className="flex gap-3 mt-7 flex-col max-md:hidden">
          <TabsList className='flex gap-3 w-full justify-evenly h-11'>
            <TabsTrigger value="videotutorial" asChild>
              <Link href={"/videotutorial"}>
                Video Tutorial
              </Link>
            </TabsTrigger>
            <TabsTrigger value="learningmats">
              Learning Materials
            </TabsTrigger>
            <TabsTrigger value="blog" asChild>
              <Link href={"/blogs"}>
                Blogs
              </Link>
            </TabsTrigger>
            <TabsTrigger value="articles" asChild>
              <Link
                href={"/article"}
              >
                Articles
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="videotutorial">

          </TabsContent>
          <TabsContent value="learningmats">

            <ApprovedMaterials selectedCommunity={selectedCommunity} />

          </TabsContent>
          <TabsContent value="blog">

          </TabsContent>
          <TabsContent value="articles">

          </TabsContent>
        </Tabs>

        {/* MOBILE VIEW */}
        <div className='md:hidden h-full'>
          <Separator className='my-3' />
          <ApprovedMaterials selectedCommunity={selectedCommunity} />
          <div className='h-[32px]' />
        </div>
      </div>
    </div>
  )
}

export default LearningMaterials