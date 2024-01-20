"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { error } from "console"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./Ui/Button"

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    return (
        <div>
            {imageUrl.length ? <div>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setImageUrl("")
                    }}
                >
                    Change Image
                </Button>
                <Image
                    src={imageUrl}
                    alt="productImage"
                    width={376}
                    height={190}
                />
            </div> : <UploadDropzone
                className="text-green bg-transparent"
                appearance={{
                    button: "bg-[#099073] p-2",
                    label: "text-green"
                }}
                endpoint="changeAvatar"
                onClientUploadComplete={(res) => {
                    console.log('Files: ', res);
                    if (res && res.length > 0 && res[0].url) {
                        setImageUrl(res[0].url);
                    } else {
                        console.error('Please input a valid product image.', res);
                        // Handle the case when the response is not as expected
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />}



        </div>
    )
}

export default ImageUpload