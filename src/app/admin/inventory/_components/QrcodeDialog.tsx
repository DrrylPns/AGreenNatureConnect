'use client';
import { Button } from "@/app/components/Ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/lib/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { Community } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { addQR } from "../../../../../actions/community";

export function DialogDemo() {
  const [community, setCommunity] = useState<Community>()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const imageIsEmpty = imageUrl.length === 0

  useEffect(() => {
    getCommunity()
  }, [])

  const getCommunity = async () => {
    const res = (await axios.get('/api/admin/community')).data
    setCommunity(res)
  }

  if (!community) (
    <>
      Error fetching community!
    </>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='newGreen'>Payment QR Code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {community?.qrCode ? "Current community's QR Code." : "Upload the community's QR Code."}
          </DialogTitle>
          <DialogDescription>

            {/* {community?.qrCode &&
              <div className="">
                <Image
                  src={imageUrl}
                  alt="productImage"
                  className="cursor-pointer rounded-full border border-black/60 w-[70px] h-[70px]"
                  width={70}
                  height={70}
                  onClick={() => {
                    setImageUrl("")
                  }}
                />
              </div>} */}

            {community?.qrCode ? (
              <>
                <div
                  className='flex justify-center items-center flex-col'
                >
                  <Image
                    alt='Community QR Code'
                    src={`${community.qrCode}`}
                    width={250}
                    height={250}
                    className='mb-3'
                  />
                  <h1 className='mt-3 text-gray-500'>Uploaded Successfully</h1>
                </div>
              </>
            )
              :
              (
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
              )}

          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="newGreen"
            disabled={isPending || imageIsEmpty}
            onClick={async () => {
              startTransition(() => {
                addQR(community?.id as string, imageUrl).then((callback) => {
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
  )
}
