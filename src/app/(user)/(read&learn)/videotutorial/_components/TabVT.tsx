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
import { PopoverVideo } from "./PopoverVideo";
import { VideoTutorials } from "./VideoTutorials";
import { EnumValues } from "zod";

type Community = {
    id: string;
    name: string
    createdAt: Date;
    updatedAt: Date;
    VideoTutorial: VideoTutorial[];
}

type VideoTutorial = {
    id: string;
    title: string;
    video: string;
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
    VideoTutorial: VideoTutorial[];
};

export interface TabVTProps {
    communities: Community[] & {
        VideoTutorial: VideoTutorial & {
            author: User
        }
    }
}

export const TabVT: React.FC<TabVTProps> = ({
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
                    <div className="text-4xl font-bold mb-7 pr-0">Video Tutorials</div>
                    <div>
                        <PopoverVideo onSelectCommunity={handleSelectCommunity} />
                    </div>
                </div>
                <p className="text-muted-foreground">
                    Engage with visual guides and step-by-step tutorials, providing
                    hands-on demonstrations for implementing urban farming techniques
                    effectively.
                </p>

                <Tabs
                    defaultValue="videotutorial"
                    className="flex gap-3 mt-7 flex-col max-md:hidden"
                >
                    <TabsList className="flex gap-3 w-full justify-evenly h-11">
                        <TabsTrigger value="videotutorial">Video Tutorial</TabsTrigger>
                        <TabsTrigger value="learningmats" asChild>
                            <Link href={"/learningMaterials"}>Learning Materials</Link>
                        </TabsTrigger>
                        <TabsTrigger value="blog" asChild>
                            <Link href={"/blogs"}>Blogs</Link>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="videotutorial">
                        <VideoTutorials selectedCommunity={selectedCommunity as string} communities={communities} />
                    </TabsContent>
                    <TabsContent value="learningmats"></TabsContent>
                    <TabsContent value="blog"></TabsContent>
                    <TabsContent value="articles"></TabsContent>
                </Tabs>

                {/* MOBILE VIEW */}
                <div className="md:hidden">
                    <Separator className="my-3" />
                    <VideoTutorials selectedCommunity={selectedCommunity as string} communities={communities} />
                    <div className="h-[32px]" />
                </div>
            </div>
        </div>
    )
}
