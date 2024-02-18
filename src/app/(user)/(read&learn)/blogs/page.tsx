import Link from 'next/link'
import { InformationImage } from '../components/information-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { getAuthSession } from '@/lib/auth';
import { ApprovedBlogs } from './_components/ApprovedBlogs';
import { Separator } from '@/app/components/Ui/Separator';

async function Blogs({ }: {

}) {

  const session = await getAuthSession();

  return (
    <div className=' w-full h-screen'>
      {/* <div className=''> */}
      {/* <InformationImage
                src='https://utfs.io/f/004ab6ca-9251-4611-a71e-71dd5e0705a7-k9bc7k.png'
                title='Video Tutorials'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur commodi esse ea facere expedita, dolore id error voluptate nostrum blanditiis!'
            /> */}
      {/* </div> */}
      <div>
        <h1 className='text-4xl font-bold mb-7'>Blogs</h1>
        <p className='text-muted-foreground'>Dive into insightful narratives and experiences shared by enthusiasts, offering a personal perspective on urban farming's challenges and triumphs.</p>
      </div>

      <Tabs defaultValue="blog" className="flex flex-col gap-3 mt-7 pr-11 max-md:hidden">
        <TabsList className='flex gap-3 w-full justify-evenly h-11'>
          <TabsTrigger value="videotutorial" asChild>
            <Link href={"/videotutorial"}>
              Video Tutorial
            </Link>
          </TabsTrigger>
          <TabsTrigger value="learningmats" asChild>
            <Link
              href={"/learningMaterials"}
            >
              Learning Materials
            </Link>
          </TabsTrigger>
          <TabsTrigger value="blog">
            Blogs
          </TabsTrigger>
          <TabsTrigger value="articles" asChild>
            <Link href={"/article"}>
              Articles
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videotutorial">

        </TabsContent>
        <TabsContent value="learningmats">

        </TabsContent>
        <TabsContent value="blog">

          <ApprovedBlogs />

        </TabsContent>
        <TabsContent value="articles">

        </TabsContent>
      </Tabs>

      {/* MOBILE VIEW */}
      <div className='md:hidden'>
        <Separator className='my-3' />
        <ApprovedBlogs />
        <div className='h-[32px]' />
      </div>

    </div>
  )
}

export default Blogs