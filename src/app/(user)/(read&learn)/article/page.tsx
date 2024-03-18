import Link from "next/link";
import { InformationImage } from "../components/information-image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Ui/tabs";
import { Separator } from "@/app/components/Ui/Separator";

const page = () => {
  return (
    <div className="w-full h-screen">
      {/* <div className=''> */}
      {/* <InformationImage
                src='https://utfs.io/f/004ab6ca-9251-4611-a71e-71dd5e0705a7-k9bc7k.png'
                title='Video Tutorials'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur commodi esse ea facere expedita, dolore id error voluptate nostrum blanditiis!'
            /> */}
      {/* </div> */}
      <div>
        <h1 className="text-4xl font-bold mb-7">Articles</h1>
        <p className="text-muted-foreground">
          Access informative articles delving into the latest trends,
          innovations, and research findings in urban farming, fostering a
          deeper understanding of this dynamic field.
        </p>
      </div>

      <Tabs defaultValue="articles" className="flex gap-3 mt-7 max-md:hidden">
        <TabsList className="flex gap-3 w-full justify-evenly h-11">
          <TabsTrigger value="videotutorial" asChild>
            <Link href={"/videotutorial"}>Video Tutorial</Link>
          </TabsTrigger>
          <TabsTrigger value="learningmats" asChild>
            <Link href={"/learningMaterials"}>Learning Materials</Link>
          </TabsTrigger>
          <TabsTrigger value="blog" asChild>
            <Link href={"/blogs"}>Blogs</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videotutorial"></TabsContent>
        <TabsContent value="learningmats"></TabsContent>
        <TabsContent value="blog"></TabsContent>
        <TabsContent value="articles"></TabsContent>
      </Tabs>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        <Separator className="my-3" />
        {/* INSERT APPROVED ARTICLES HERE */}
        <div className="h-[32px]" />
      </div>
    </div>
  );
};

export default page;
