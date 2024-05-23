'use client'
import { Button } from "@/app/components/Ui/Button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { PaymentGcashSchema, PaymentGcashType } from "@/lib/validations/paymentGcashSchema";
import Image from "next/image";
import { useState, useTransition } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/lib/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProof } from "../../../../actions/transaction";
import { transactionWithOrderedProducts } from "@/lib/types";

interface Transaction {
    id: string;
    referenceId: string;
    amount: number;
    status: string;
    buyer: Buyer;
    paymentMethod: string | null;
    paymentStatus: string | null;
    checkOutSessionId: string | null;
    gcashReciept: string | null;
    seller: Community
    createdAt: Date;
    updatedAt: Date;
}
interface Community {
    id: string;
    name: string;
    qrCode: string | null;
    contactNumber: string;
}
interface Buyer {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    image: string | null;
    middleName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    address: string | null;
}
interface OrderedVariant {
    id: string;
    product: Product;
    variant: Variants;
    price: number;
}
interface Variants {
    id: string;
    unitOfMeasurement: string;
    variant: number;
    price: number;
    EstimatedPieces: number | null;
}
interface Product {
    id: string;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    category: string;
    status: string;
    isFree: boolean;
}



function QrCodeDrawer({
    transaction
}: {
    transaction: transactionWithOrderedProducts
}) {
    const [isPending, startTransition] = useTransition()
    const [imageUrl, setImageUrl] = useState<string>('')

    const imageIsEmpty = imageUrl.length === 0


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="newGreen" className="bg-lime-500 hover:bg-lime-500/80">Pay now</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        <h1 className='text-center'>Scan this QR code to pay!</h1></DrawerTitle>
                    <DrawerDescription>
                        {transaction.seller.qrCode === null ? (
                            <div>
                                <h1>GCach payment for Community {transaction.seller.name} is not Available right now!</h1>
                            </div>
                        ) :
                            //@ts-ignore
                            transaction?.gcashReciept?.length >= 0 ? (
                                <div
                                    className='flex justify-center items-center flex-col'
                                >
                                    <Image
                                        alt='user not paid'
                                        src={"/images/employee/review.svg"}
                                        width={250}
                                        height={250}
                                        className='mb-3'
                                    />
                                    <h1 className='mt-3 text-gray-500 text-lg'>Your payment proof is currently under review. Please wait for any updates.</h1>
                                </div>
                            ) : (
                                <div className="bg-gray-200 md:p-10 shadow-md drop-shadow-md p-5">
                                    <div className="w-full bg-white text-center">
                                        <Image
                                            src={transaction.seller.qrCode}
                                            width={100}
                                            height={100}
                                            alt={`Qr code for ${transaction.seller.name}`}
                                            className='w w-36 h-36 md:w-56 md:h-56 mx-auto'
                                        />
                                        <h1 className="font-semibold text-center md:text-3xl">{transaction.seller.name}</h1>
                                    </div>

                                    <div className='text-xl md:grid md:grid-rows-2 justify-center items-center'>
                                        <div className='mt-5 text-center'>
                                            <h1 className="col-span-3 text-xs md:text-xl">Total amount to be paid: <span className='font-semibold text-green text-2xl'>₱ {transaction.amount}</span></h1>
                                            <p className='text-muted-foreground text-base'>Note: if you can't scan the code, the number of community is available</p>
                                            <h1>{transaction.seller.contactNumber}</h1>
                                        </div>

                                        <div className="mx-auto">
                                            {imageUrl.length ?
                                                <div
                                                    className='flex justify-center items-center flex-col'
                                                >
                                                    <Image
                                                        alt='Done Upload'
                                                        src={imageUrl}
                                                        width={250}
                                                        height={250}
                                                        className='mb-3'
                                                    />
                                                    <Button variant={'ghost'} onClick={() => { setImageUrl('') }}>Remove</Button>
                                                </div> :
                                                <div className="col-span-3 w-56">
                                                    <UploadDropzone
                                                        className="text-green border border-black"
                                                        appearance={{
                                                            button: "bg-[#099073] ",
                                                            label: "text-green",
                                                            allowedContent: "flex flex-col items-center justify-center text-green",
                                                        }}
                                                        endpoint="changeAvatar"
                                                        onClientUploadComplete={(res) => {
                                                            console.log('Files: ', res);
                                                            if (res && res.length > 0 && res[0].url) {
                                                                setImageUrl(res[0].url);
                                                            } else {
                                                                console.error('Please input a valid receipt image.', res);
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
                                                    <h1 className='text-center text-sm' >Upload your GCash receipt</h1>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="mt-0">
                    <Button
                        type="submit"
                        disabled={imageIsEmpty || isPending}
                        onClick={() => {
                            startTransition(() => {
                                insertProof(imageUrl, transaction.id).then((callback) => {
                                    if (callback.error) {
                                        toast({
                                            description: callback.error,
                                            variant: "destructive"
                                        })
                                    }

                                    if (callback.success) {
                                        toast({
                                            description: callback.success,
                                        })
                                    }
                                })
                            })
                        }}
                    >Submit</Button>
                    <DrawerClose>
                        <Button variant="outline" onClick={() => { setImageUrl('') }}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default QrCodeDrawer