"use client";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Ui/tabs";
import { getAuthSession } from "@/lib/auth";
import { ApprovedBlogs } from "./_components/ApprovedBlogs";
import { Separator } from "@/app/components/Ui/Separator";
import { useState } from "react";
import { PopoverVideo } from "../videotutorial/_components/PopoverVideo";

function Blogs() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );
  const handleSelectCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
  };
  return (
    <div className="w-full h-full max-md:mt-5 overflow-hidden">
      <div className="h-screen">
        <div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:mb-3">
          <div className="text-4xl font-bold mb-7 pr-0">Blogs</div>
          <div>
            <PopoverVideo onSelectCommunity={handleSelectCommunity} />
          </div>
        </div>
        <p className="text-muted-foreground">
          Dive into insightful narratives and experiences shared by enthusiasts,
          offering a personal perspective on urban farming's challenges and
          triumphs.
        </p>

        <Tabs
          defaultValue="blog"
          className="flex gap-3 mt-7 flex-col max-md:hidden"
        >
          <TabsList className="flex gap-3 w-full justify-evenly h-11">
            <TabsTrigger value="videotutorial" asChild>
              <Link href={"/videotutorial"}>Video Tutorial</Link>
            </TabsTrigger>
            <TabsTrigger value="learningmats" asChild>
              <Link href={"/learningMaterials"}>Learning Materials</Link>
            </TabsTrigger>
            <TabsTrigger value="blog">Blogs</TabsTrigger>
          </TabsList>
          <TabsContent value="videotutorial"></TabsContent>
          <TabsContent value="learningmats"></TabsContent>
          <TabsContent value="blog">
            <ApprovedBlogs selectedCommunity={selectedCommunity} />
          </TabsContent>
          <TabsContent value="articles"></TabsContent>
        </Tabs>

        {/* MOBILE VIEW */}
        <div className="md:hidden">
          <Separator className="my-3" />
          <ApprovedBlogs selectedCommunity={selectedCommunity} />
          <div className="h-[32px]" />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
