import React from 'react'
import { Separator } from "@/app/components/Ui/Separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Ui/Dialog";
import { ScrollArea } from "@/app/components/Ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs';
import { Check, Laugh, LeafyGreen, X } from 'lucide-react';
import { CheckReactList } from './_reactions/CheckReactList';
import { XMarkReactList } from './_reactions/XMarkReactList';
import { LeafReactList } from './_reactions/LeafReactList';
import { LaughReactList } from './_reactions/LaughReactList';

export const ReactionList = () => {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <div className='flex justify-center my-1 cursor-pointer items-center lg:justify-start'>
                    Click to see who reacted!
                </div>
            </DialogTrigger>
            <DialogContent>
                <ScrollArea className="h-[400px] rounded-md p-4">
                    <Tabs defaultValue="check" className="flex flex-col justify-evenly w-full h-full">
                        <TabsList className='dark:bg-[#27272a] bg-zinc-700 flex flex-row items-center justify-evenly gap-3'>
                            <TabsTrigger value="check" className='data-[state=active]:bg-gray-200 p-0 rounded-full data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:text-black'>
                                <Check
                                    className={`cursor-pointer hover:rounded-full p-1 w-8 h-8 rounded-full text-lime-500`}
                                />
                            </TabsTrigger>

                            <TabsTrigger value="xmark" className='data-[state=active]:bg-gray-200 p-0 rounded-full data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:text-black'>
                                <X
                                    className={`cursor-pointer hover:rounded-full p-1 w-8 h-8 rounded-full text-rose-500`}
                                />
                            </TabsTrigger>

                            <TabsTrigger value="leaf" className='data-[state=active]:bg-gray-200 p-0 rounded-full data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:text-black'>
                                <LeafyGreen
                                    className={`cursor-pointer hover:rounded-full p-1 w-8 h-8 rounded-full text-lime-600`}
                                />
                            </TabsTrigger>

                            <TabsTrigger value="laugh" className='data-[state=active]:bg-gray-200 p-0 rounded-full data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:text-black'>
                                <Laugh
                                    className={`cursor-pointer hover:rounded-full p-1 w-8 h-8 rounded-full text-yellow-500/80`}
                                />
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="check">
                            <CheckReactList />
                        </TabsContent>
                        <TabsContent value="xmark">
                            <XMarkReactList />
                        </TabsContent>
                        <TabsContent value="leaf">
                            <LeafReactList />
                        </TabsContent>
                        <TabsContent value="laugh">
                            <LaughReactList />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
