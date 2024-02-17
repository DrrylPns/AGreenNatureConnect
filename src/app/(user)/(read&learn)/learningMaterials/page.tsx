import Link from 'next/link'
import { InformationImage } from '../components/information-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'
import { ApprovedMaterials } from './_components/ApprovedMaterials'


function LearningMaterials() {
  return (
    <div className='md:px-64 px-5 py-36 w-full h-screen'>
      {/* <div className=''> */}
      {/* <InformationImage
                src='https://utfs.io/f/004ab6ca-9251-4611-a71e-71dd5e0705a7-k9bc7k.png'
                title='Video Tutorials'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur commodi esse ea facere expedita, dolore id error voluptate nostrum blanditiis!'
            /> */}
      {/* </div> */}
      <div>
        <h1 className='text-4xl font-bold mb-7'>Learning Materials</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a eveniet amet fuga? Doloremque quaerat dolorum repellat eligendi architecto laborum numquam aspernatur cumque cupiditate! Dolor laudantium minus cupiditate eaque saepe voluptas iste explicabo debitis repellat, sapiente labore culpa aliquid eius similique praesentium. Alias explicabo voluptatem fuga libero magnam expedita beatae molestiae esse minus suscipit debitis dolorum, labore sunt cumque distinctio impedit consequuntur tempora ullam error! Nam cumque quidem tempora qui, sed eaque iste corporis facere aliquam nulla quo, quas error sequi. Non eius quod, aut consectetur commodi similique in nesciunt molestias dignissimos quisquam ea ipsa veritatis, quasi libero veniam fuga?</p>
      </div>

      <Tabs defaultValue="learningmats" className="flex gap-3 mt-7 flex-col max-md:hidden">
        <TabsList className='flex gap-3 w-full justify-evenly h-11'>
          <TabsTrigger value="videotutorial" >
            <Link href={"/videotutorial"}>
              Video Tutorial
            </Link>
          </TabsTrigger>
          <TabsTrigger value="learningmats">
            Learning Materials
          </TabsTrigger>
          <TabsTrigger value="blog">
            <Link href={"/blogs"}>
              Blogs
            </Link>
          </TabsTrigger>
          <TabsTrigger value="articles">
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

    </div>

    // <div className='pl-[0] md:pl-[20%] pt-[8rem] bg-[#F0EEF6] md:pt-[6rem]'>
    //     <Material/>
    // </div>
  )
}

export default LearningMaterials