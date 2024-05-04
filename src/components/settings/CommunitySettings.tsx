"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Ui/Avatar"
import { Button } from "@/app/components/Ui/Button"
import { Separator } from "@/app/components/Ui/Separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/lib/hooks/use-toast"
import useCommunityAvatarModal from "@/lib/hooks/useCommunityAvatarModal"
import useCommunitySettingsModal from "@/lib/hooks/useCommunitySettingsModal"
import { UploadDropzone } from "@/lib/uploadthing"
import { Community, User } from "@prisma/client"
import Image from "next/image"
import React, { useState, useTransition } from "react"
import { addQR } from "../../../actions/community"
import useCommunityCarouselModal from "@/lib/hooks/useCommunityCarouselModal"

interface Props {
    user: User & {
        Community: Community
    }
}

export const CommunitySettings: React.FC<Props> = ({ user }) => {
    const communitySettings = useCommunitySettingsModal()
    const communityAvatarModal = useCommunityAvatarModal()
    const communityCarousel = useCommunityCarouselModal()
    const firstLetter = user.Community?.name?.charAt(0).toUpperCase()
    const [imageUrl, setImageUrl] = useState<string>('')
    const imageIsEmpty = imageUrl.length === 0
    const [isPending, startTransition] = useTransition()

    return (
        <div className='ml-3 space-y-4'>

            <div className="w-full flex justify-end font-medium text-blue-500">
                <div className="text-blue-500 cursor-pointer" onClick={communitySettings.onOpen}>
                    Edit Settings
                </div>
            </div>

            {/* <div className='flex justify-between items-center'>
                <div>
                    <p className='dark:text-white text-black font-medium'>Username</p>
                    <p className='text-muted-foreground'>
                        {user.username}
                    </p>
                </div>
                <div className='text-blue-500 font-medium'>

                </div>
            </div> */}

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Phone</p>
                <p className='text-muted-foreground'>{user?.Community?.contactNumber}</p>
            </div>

            {/* <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Birthday</p>
                <p className='text-muted-foreground'>{formatDate(user.birthday as Date)}</p>
            </div>

            <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Age</p>
                <p className='text-muted-foreground'>

                </p>
            </div> */}

            {/* <div className='space-y-1 flex flex-col justify-start items-start'>
                <p className='dark:text-white text-black font-medium'>Address</p>
                <p className='text-muted-foreground'>

                </p>
            </div> */}

            <Separator />

            <p className='dark:text-white text-black font-medium'>Community Image</p>
            <div className='flex flex-col items-center'>
                <div className='space-y-1'>
                    <Avatar className='h-[90px] w-[90px] flex items-center justify-center'>
                        <AvatarImage src={user?.Community?.displayPhoto as string} className='w-[90px] h-[90px] flex items-center justify-center' />
                        <AvatarFallback>{firstLetter}</AvatarFallback>
                    </Avatar>
                </div>

                <div
                    className='cursor-pointer text-blue-500 font-medium mt-1'
                    onClick={communityAvatarModal.onOpen}
                >
                    Change
                </div>
            </div>

            <Separator />

            <div>
                <p className='dark:text-white text-black font-medium'>QR Code</p>
                <p className="text-sm text-muted-foreground">Note: this qr code is for markethub transactions.</p>
            </div>
            <div className='flex flex-col items-center'>
                <div className='space-y-1'>
                    {user?.Community?.qrCode ? (
                        <Image
                            alt='Community QR Code'
                            src={`${user?.Community?.qrCode}`}
                            width={250}
                            height={250}
                            className='mb-3'
                        />
                    ) :
                        (
                            <div
                                className='flex justify-center items-center flex-col'
                            >
                                <Image
                                    alt='user not paid'
                                    src={"/images/employee/not_paid.svg"}
                                    width={250}
                                    height={250}
                                    className='mb-3'
                                />
                                <h1 className='mt-3 text-gray-500 text-base'>No QR Code yet!</h1>
                            </div>
                        )
                    }
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className='cursor-pointer text-blue-500 font-medium mt-1'
                        >
                            {user?.Community?.qrCode ? (
                                <>
                                    Change QR
                                </>
                            ) :
                                (
                                    <>
                                        Upload QR
                                    </>
                                )
                            }
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {user?.Community?.qrCode ? (
                                    <>
                                        Upload a new community's QR Code
                                    </>
                                ) :
                                    (
                                        <>
                                            Upload a QR code for your community!

                                        </>
                                    )
                                }
                            </DialogTitle>
                            <DialogDescription>
                                <>
                                    {imageUrl.length ? <div
                                        className='flex justify-center items-center flex-col'
                                    >
                                        <Image
                                            alt='Done Upload'
                                            src={`${imageUrl}`}
                                            width={250}
                                            height={250}
                                            className='mb-3'
                                        />
                                        <h1 className='mt-3 text-gray-500'>Uploaded Successfully</h1>
                                    </div> : <UploadDropzone
                                        className="text-green"
                                        appearance={{
                                            button: "bg-[#099073] p-2",
                                            label: "text-green",
                                            allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                                        }}
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            console.log('Files: ', res);
                                            if (res && res.length > 0 && res[0].url) {
                                                setImageUrl(res[0].url);
                                            } else {
                                                console.error('Please input a valid product image.', res);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            toast({
                                                title: 'Error!',
                                                description: error.message,
                                                variant: 'destructive',
                                            })
                                        }}
                                    />}
                                </>


                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                type="submit"
                                variant="newGreen"
                                disabled={isPending || imageIsEmpty}
                                onClick={async () => {
                                    startTransition(() => {
                                        addQR(user?.Community?.id as string, imageUrl).then((callback) => {
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
                </Dialog>

                <Separator />

                <div className="mt-3">
                    <p className='dark:text-white text-black font-medium'>Carousel Images</p>
                    <p className="text-sm text-muted-foreground">Note: carousels are for your markethub slideshow images!</p>
                </div>
                <div className="text-blue-500 cursor-pointer font-semibold mt-2" onClick={communityCarousel.onOpen}>
                    Add carousel
                </div>
            </div>
        </div>
    )
}
