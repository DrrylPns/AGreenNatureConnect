"use client"
import { Button } from "@/app/components/Ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import { toast } from "@/lib/hooks/use-toast"
import useAvatarModal from "@/lib/hooks/useAvatarModal"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import { useState, useTransition } from 'react'
import { changeAvatar } from "../../../actions/settings"


export const AvatarModal = () => {
    const [isPending, startTransition] = useTransition()
    const { isOpen, onClose } = useAvatarModal()
    const [imageUrl, setImageUrl] = useState<string>("")
    const imageIsEmpty = imageUrl.length === 0

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none w-full'>
                <DialogHeader>
                    <DialogDescription>
                        {imageUrl.length ? <div className="w-full flex flex-col items-center justify-center mt-5">
                            <Image
                                alt='Done Upload'
                                src={"/images/employee/done_upload.svg"}
                                width={250}
                                height={250}
                                className='mb-3'
                            />
                            <h1 className='text-xl text-muted-foreground'>Image Uploaded!</h1>
                        </div> : <UploadDropzone
                            className="text-green"
                            appearance={{
                                button: "bg-[#00B207] p-2 mb-3",
                                label: "text-green",
                                allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                            }}
                            endpoint="changeAvatar"
                            onClientUploadComplete={(res) => {
                                console.log('Files: ', res);
                                if (res && res.length > 0 && res[0].url) {
                                    setImageUrl(res[0].url);
                                } else {
                                    console.error('Please input a valid image.', res);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                toast({
                                    title: 'Error!',
                                    description: error.message,
                                    variant: 'destructive',
                                })
                            }}
                        />
                        }

                        <div className="w-full flex justify-end items-end mt-3">
                            <Button
                                variant="newGreen"
                                disabled={isPending || imageIsEmpty}
                                onClick={() => {
                                    startTransition(() => {
                                        changeAvatar(imageUrl).then((callback) => {
                                            if (callback.error) {
                                                toast({
                                                    description: callback.error,
                                                    variant: "destructive"
                                                })
                                            }

                                            if (callback.success) {
                                                toast({
                                                    description: callback.success
                                                })
                                                onClose()
                                                setImageUrl("")
                                            }
                                        })
                                    })
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
