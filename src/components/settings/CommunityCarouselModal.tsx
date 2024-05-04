"use client"
import { Button } from "@/app/components/Ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader
} from "@/components/ui/dialog"
import { toast } from "@/lib/hooks/use-toast"
import useCommunityCarouselModal from "@/lib/hooks/useCommunityCarouselModal"
import { UploadDropzone } from "@/lib/uploadthing"
import { Community, User } from '@prisma/client'
import Image from "next/image"
import { useState, useTransition } from 'react'
import { handleCarousel } from "../../../actions/community"
import { ScrollArea, ScrollBar } from "@/app/components/Ui/scroll-area"

interface Props {
    user: User & {
        Community: Community
    }
}

export const CommunityCarouselModal: React.FC<Props> = ({ user }) => {
    const [isPending, startTransition] = useTransition()
    const { isOpen, onClose } = useCommunityCarouselModal()
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const imageIsEmpty = imageUrls.length === 0

    const handleUploadComplete = (res: any) => {
        console.log('Files: ', res);
        const uploadedUrls = res.map((file: any) => file.url);
        setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedUrls]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none w-full'>
                <DialogHeader>
                    <DialogDescription>
                        {imageUrls.length ? <div
                            className='flex justify-center items-center flex-col'
                        >
                            {/* {imageUrls.map((url, index) => (
                                <div key={index} className="flex justify-center items-center flex-col">
                                    <img alt="Uploaded" src={url} width={250} height={250} className="mb-3" />
                                    <h1 className="mt-3 text-gray-500">Uploaded Successfully</h1>
                                </div> */}
                            <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
                                <div className="flex w-max space-x-4 p-4">
                                    {imageUrls.map((url, index) => (
                                        <figure key={index} className="shrink-0">
                                            <div className="overflow-hidden rounded-md">
                                                <Image
                                                    src={url}
                                                    alt={"123"}
                                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                                    width={300}
                                                    height={400}
                                                />
                                            </div>
                                            <figcaption className="pt-2 text-base text-muted-foreground">
                                                Photo {" "}
                                                <span className="">
                                                    {index + 1}
                                                </span>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            {/* ))} */}
                        </div> : <UploadDropzone
                            className="text-green"
                            appearance={{
                                button: "bg-[#099073] p-2",
                                label: "text-green",
                                allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                            }}
                            endpoint="imageCarousel"
                            onClientUploadComplete={handleUploadComplete}
                            onUploadError={(error: Error) => {
                                toast({
                                    title: 'Error!',
                                    description: error.message,
                                    variant: 'destructive',
                                });
                            }}
                        />
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="submit"
                        variant="newGreen"
                        disabled={isPending || imageIsEmpty}
                        onClick={async () => {
                            startTransition(() => {
                                handleCarousel(imageUrls).then((callback) => {
                                    if (callback?.error) {
                                        toast({
                                            description: `${callback.error}`,
                                            variant: "destructive"
                                        })
                                    }

                                    if (callback?.success) {
                                        toast({
                                            description: `${callback.success}`
                                        })
                                    }

                                })
                            })
                        }}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
