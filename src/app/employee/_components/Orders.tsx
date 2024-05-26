"use client"

import RelativeDate from '@/app/components/RelativeDate'; import { Button } from '@/app/components/Ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/Ui/alert-dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { RadioGroup, RadioGroupItem } from '@/app/components/Ui/radio-group';
import { Textarea } from '@/app/components/Ui/textarea';
import { toast } from '@/lib/hooks/use-toast';
import { DeclineProductSchema, FormType } from '@/lib/validations/employee/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
;
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckProofPayment } from './CheckProofPayment';
import { CancelType, OrderedProducts, TransactionStatus } from '@prisma/client';
import { orderedProductsWithProducts } from '@/lib/types';

interface OrdersProps {
    selectedIndex: number;
    noOrders: string;
    transactions: Transaction[];
    cancelBtnDisplay: "block" | "hidden";
    handleCancel: (transactionId: string) => void;
    handleApprove?: (transactionId: string) => void;
    handlePickup?: (transactionId: string) => void;
    handleComplete?: (transactionId: string) => void;
    status: string;
}
interface Transaction {
    // id: string;
    // referenceId: string;
    // amount: number;
    // status: string;
    // buyer: Buyer;
    // paymentMethod: string | null;
    // paymentStatus: string | null;
    // gcashReciept: string | null;
    // seller: Community
    // orderedVariant: OrderedVariant[]
    // createdAt: Date;
    // updatedAt: Date;

    id: string;
    referenceId: string;
    amount: number;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
    cancelReason: string | null;
    cancelType: CancelType | null;
    paymentMethod: string | null;
    gcashReciept: string | null;
    paymentStatus: string | null; 
    checkOutSessionId:string | null;
    buyerId: string;
    sellerId: string;
    orderedProducts: orderedProductsWithProducts[]
    seller: Community
}

interface Community {
    id: string;
    name: string;
    qrCode: string | null;
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
    quantity: number
}
interface Variants {
    id: string
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



const Orders: React.FC<OrdersProps> = ({ status, noOrders, selectedIndex, transactions, cancelBtnDisplay, handleCancel, handleApprove, handlePickup, handleComplete }) => {

    const form = useForm<z.infer<typeof DeclineProductSchema>>({
        resolver: zodResolver(DeclineProductSchema),
    })

    const { mutate: handleDecline, isLoading } = useMutation({
        mutationFn: async ({ transactionId, type, otherReason }: FormType) => {
            const payload: FormType = {
                transactionId,
                type,
                otherReason
            }

            const { data } = await axios.put("/api/markethub/transaction/cancelled", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    toast({
                        description: "No transaction found!",
                        variant: 'destructive',
                    })
                }
            } else {
                return toast({
                    title: 'Something went wrong.',
                    description: "Error",
                    variant: 'destructive',
                })
            }
        },
        onSuccess: (data) => {
            toast({
                description: `Successfully declined the transaction.`,
                variant: 'default',
            })

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    })

    function onSubmit(values: FormType, transactionId: string) {
        const payload: FormType = {
            transactionId,
            type: values.type,
            otherReason: values.otherReason,
        }

        handleDecline(payload)
    }

    return (
        <div className='w-full min-h-screen font-poppins transition-all ease-in-out duration-500 mt-[100px]'>
            {selectedIndex == selectedIndex && (
                <div className=''>
                    {transactions.length > 0 ? transactions.map((transaction: Transaction) => (
                        <div className='mt-5 border bg-gray-100 border-gray-200 shadow-sm drop-shadow-lg w-[90%] md:w-[70%] lg:w-[60%] mx-auto' key={transaction.id}>

                            <div className='flex justify-between items-center w-full px-5 md:px-10 py-3 border-gray-200 border-b-2'>
                                <h1 className='text-green font-semibold text-xs sm:text-sm md:text-xl font-poppins'> {transaction.seller.name}</h1>
                                {transaction.paymentMethod !== 'Gcash' || selectedIndex === 4 ? (
                                    null
                                ) : (
                                    <>
                                        {/* GAWIN NOT PAID IF TAPUS NA */}
                                        {transaction.gcashReciept?.length === 0 ? (
                                            <h1>Not Paid</h1>
                                        ) : (
                                            <></>
                                            // <CheckProofPayment transaction={transaction} />
                                        )}
                                    </>
                                )}
                            </div>

                            <div className='flex px-5 md:px-10 w-full my-5 gap-7 sm:gap-10 md:gap-x-20 items-center justify-center lg:justify-between transition-all ease-in-out duration-500'>
                                <div className='w-1/2'>
                                    {transaction.orderedProducts.map((product) => (
                                        <Link href={`/order-status/${transaction.id}`} className='w-full flex text-sm flex-1 gap-5 sm:gap-10 justify-between items-center transition-all ease-in-out duration-500'>
                                            <Image
                                                src={product.product.productImage}
                                                alt={product.product.name}
                                                height={50}
                                                width={50}
                                                className=''
                                            />
                                            <div className=''>
                                                <h1 className='font-semibold text-[0.6rem] sm:text-xs md:text-lg'>{product.product.name}</h1>
                                                <p className='font-semibold text-gray-400 text-[0.5rem] sm:text-xs md:text-lg'>{product.quantity} {product.unitOfMeasurement}</p>
                                            </div>
                                            <div className='ml-auto font-semibold text-[0.6rem] sm:text-xs md:text-lg'>
                                                <h1>{product.product.isFree ? "Free" : `₱ ${product.totalPrice}`}</h1>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className=' w-1/3 flex flex-col justify-end items-end '>
                                    <div className={`flex gap-3`}>
                                        {transaction.status !== "COMPLETED" && transaction.status !== "CANCELLED" && (
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <div
                                                        className={`px-3 py-1 sm:px-5 sm:py-2 md:px-10 md:py-3 rounded-md text-sm md:text-xl bg-lime-500 text-white font-medium font-poppins transition-all ease-in-out duration-500`}
                                                    >
                                                        {transaction.status === "PENDING"
                                                            ? "Approve"
                                                            : transaction.status === "APPROVED"
                                                                ? "Pickup"
                                                                : transaction.status === "PICK_UP"
                                                                    ? "Completed"
                                                                    : ""}
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {transaction.status === "PENDING"
                                                                ? "Once confirmed, the stocks of the products will be deducted."
                                                                : transaction.status === "APPROVED"
                                                                    ? "By confirming, you verify that the order is already picked up."
                                                                    : transaction.status === "PICK_UP"
                                                                        ? "Confirming this means the item has been received by the buyer."
                                                                        : ""}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel
                                                            className='bg-rose-500 hover:bg-rose-500/70'
                                                        >Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className='bg-lime-600 hover:bg-lime-600/80'
                                                            onClick={() =>
                                                                transaction.status === "PENDING"
                                                                    ? handleApprove?.(transaction.id)
                                                                    : transaction.status === "APPROVED"
                                                                        ? handlePickup?.(transaction.id)
                                                                        : transaction.status === "PICK_UP"
                                                                            ? handleComplete?.(transaction.id)
                                                                            : null
                                                            }
                                                        >Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}


                                        <Dialog>
                                            <DialogTrigger>
                                                <div
                                                    className={`${transaction.status === "PENDING" ? "block" : "hidden"} px-3 py-1 sm:px-5 sm:py-2 md:px-10 md:py-3 rounded-md text-sm md:text-xl bg-red-500 text-white font-medium font-poppins transition-all ease-in-out duration-500`}
                                                >
                                                    Decline
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader className='flex flex-col items-start gap-1'>
                                                    <DialogTitle>Why are you cancelling this order?</DialogTitle>
                                                    <DialogDescription className="w-full">
                                                        Please provide a reason for the cancellation. This will help us improve our service.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit((values) => onSubmit(values, transaction.id))} className="w-2/3 space-y-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="type"
                                                            render={({ field }) => (
                                                                <FormItem className="space-y-3">
                                                                    <FormLabel className='font-bold'>Reason</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroup
                                                                            onValueChange={field.onChange}
                                                                            defaultValue={field.value}
                                                                            className="flex flex-col space-y-1"
                                                                        >
                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="OutOfStock" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Out of Stock
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="PaymentIssues" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Payment Issues
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="AddressVerification" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Address Verification
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="SellerError" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Seller Error
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="NonResponsiveBuyer" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Non-Responsive Buyer
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="ViolationOfPolicies" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Violation Of Policies
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="ShippingRestrictions" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Shipping Restrictions
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="ProductDiscontinuation" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Product Discontinuation
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="SystemErrors" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    System Errors
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="Other_Reason" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    Others
                                                                                </FormLabel>
                                                                            </FormItem>

                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />


                                                        <div className="grid gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="otherReason"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Specify</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                placeholder="I am cancelling this order because..."
                                                                                className="resize-none w-[270px] sm:w-[460px]"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <Button type="submit" className='bg-lime-600 hover:bg-lime-600/80' isLoading={isLoading}>Submit</Button>
                                                    </form>
                                                </Form>
                                            </DialogContent>
                                        </Dialog>

                                    </div>
                                    <div className='text-[0.6rem] sm:text-lg mt-5'>
                                        <h1 className='text-gray-400'>Payment method: <span className='text-gray-700'>{transaction.paymentMethod} </span></h1>
                                        <h1 className='text-gray-400'>Payment status: <span className='text-gray-700'>{transaction.paymentStatus}</span></h1>
                                    </div>
                                </div>
                            </div>



                            <div className='flex justify-between w-full border-y-2 text-right border-gray-300 bg-gray-200 px-5 md:px-10 py-2 md:py-4 transition-all ease-in-out duration-500'>
                                <h1 className='text-[0.5rem] sm:text-sm text-gray-400 font-semibold'>{status}</h1>
                                <h1 className='text-[0.5rem] sm:text-sm font-semibold'>Order Total: <span>₱ {transaction.amount}</span></h1>
                            </div>
                        </div>
                    )) : (
                        <div className='w-full h-screen text-center mt-10'>
                            <h1 className='my-auto text-gray-400 font-semibold font-livvic'>{noOrders}</h1>
                        </div>
                    )
                    }

                </div>
            )}
        </div>
    )
}

export default Orders