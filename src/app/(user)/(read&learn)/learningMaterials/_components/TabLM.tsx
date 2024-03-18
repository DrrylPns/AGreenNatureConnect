"use client";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Ui/tabs";
import { Separator } from "@/app/components/Ui/Separator";
import { useState } from "react";
import { PopoverVideo } from "../../videotutorial/_components/PopoverVideo";
import { ApprovedMaterials } from "./ApprovedMaterials";
import { EnumValues } from "zod";

type Community = {
  id: string;
  name: string
  createdAt: Date;
  updatedAt: Date;
  LearningMaterial: LearningMaterial[];
}

type LearningMaterial = {
  id: string;
  title: string;
  material: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  isApproved: EnumValues;
  author: User;
  community: Community;
}

type User = {
  id: string;
  name?: string;
  lastName?: string;
  LearningMaterial: LearningMaterial[];
};

type TabLMProps = {
  communities: Community[] & {
    LearningMaterial: LearningMaterial & {
      author: User
    }
  }
}

export const TabLM: React.FC<TabLMProps> = ({
  communities
}) => {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );
  const handleSelectCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
  };

  return (
    <div className="w-full h-full max-md:mt-5 overflow-hidden">
      <div className="h-full">
        <div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:mb-3">
          <div className="text-4xl font-bold mb-7 pr-0">Learning Materials</div>
          <div>
            <PopoverVideo onSelectCommunity={handleSelectCommunity} />
          </div>
        </div>
        <p className="text-muted-foreground">
          Explore detailed PDF resources on urban farming, covering essential
          concepts and practical guidance for cultivating sustainable urban
          environments.
        </p>

        <Tabs
          defaultValue="learningmats"
          className="flex gap-3 mt-7 flex-col max-md:hidden"
        >
          <TabsList className="flex gap-3 w-full justify-evenly h-11">
            <TabsTrigger value="videotutorial" asChild>
              <Link href={"/videotutorial"}>Video Tutorial</Link>
            </TabsTrigger>
            <TabsTrigger value="learningmats">Learning Materials</TabsTrigger>
            <TabsTrigger value="blog" asChild>
              <Link href={"/blogs"}>Blogs</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="videotutorial"></TabsContent>
          <TabsContent value="learningmats">
            <ApprovedMaterials selectedCommunity={selectedCommunity as string} communities={communities} />
          </TabsContent>
          <TabsContent value="blog"></TabsContent>
          <TabsContent value="articles"></TabsContent>
        </Tabs>

        {/* MOBILE VIEW */}
        <div className="md:hidden h-full">
          <Separator className="my-3" />
          <ApprovedMaterials selectedCommunity={selectedCommunity as string} communities={communities} />
          <div className="h-[32px]" />
        </div>
      </div>
    </div>
  )
}
