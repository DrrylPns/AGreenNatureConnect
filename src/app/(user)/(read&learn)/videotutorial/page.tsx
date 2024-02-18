
import Link from 'next/link'
import { InformationImage } from '../components/information-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { Separator } from '@/app/components/Ui/Separator'
import { VideoTutorials } from './_components/VideoTutorials'

const page = () => {

    return (
        <div className='md:pl-64 px-5 py-36 w-full h-screen'>
            {/* <div className=''> */}
            {/* <InformationImage
                src='https://utfs.io/f/004ab6ca-9251-4611-a71e-71dd5e0705a7-k9bc7k.png'
                title='Video Tutorials'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur commodi esse ea facere expedita, dolore id error voluptate nostrum blanditiis!'
            /> */}
            {/* </div> */}
            <div>
                <h1 className='text-4xl font-bold mb-7 pr-0'>Video Tutorials</h1>
                <p className='text-muted-foreground'>Engage with visual guides and step-by-step tutorials, providing hands-on demonstrations for implementing urban farming techniques effectively.</p>
            </div>

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
                    <VideoTutorials />
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
                <VideoTutorials />
                <div className='h-[32px]' />
            </div>
        </div>
    )
}

export default page