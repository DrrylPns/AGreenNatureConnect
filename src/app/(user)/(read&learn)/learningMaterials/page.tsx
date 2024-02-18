import Link from 'next/link'
import { InformationImage } from '../components/information-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { ApprovedMaterials } from './_components/ApprovedMaterials'
import { Separator } from '@/app/components/Ui/Separator'


function LearningMaterials() {
  return (
    <div className='w-full h-screen'>
      {/* <div className=''> */}
      {/* <InformationImage
                src='https://utfs.io/f/004ab6ca-9251-4611-a71e-71dd5e0705a7-k9bc7k.png'
                title='Video Tutorials'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur commodi esse ea facere expedita, dolore id error voluptate nostrum blanditiis!'
            /> */}
      {/* </div> */}
      <div>
        <h1 className='text-4xl font-bold mb-7'>Learning Materials</h1>
        <p className='text-muted-foreground'>Explore detailed PDF resources on urban farming, covering essential concepts and practical guidance for cultivating sustainable urban environments.</p>
      </div>

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

          <ApprovedMaterials />

        </TabsContent>
        <TabsContent value="blog">

        </TabsContent>
        <TabsContent value="articles">

        </TabsContent>
      </Tabs>

      {/* MOBILE VIEW */}
      <div className='md:hidden'>
        <Separator className='my-3' />
        <ApprovedMaterials />
        <div className='h-[32px]' />
      </div>

    </div>
  )
}

export default LearningMaterials