"use client"
import { Button } from '@/app/components/Ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog';
import { Transaction } from '@prisma/client';
import Image from 'next/image';
import { useTransition } from 'react';
import { confirmProof } from '../../../../actions/transaction';
import { toast } from '@/lib/hooks/use-toast';

interface CheckProofPaymentProps {
    transaction: Transaction
}

export const CheckProofPayment: React.FC<CheckProofPaymentProps> = ({ transaction }) => {
    const [isPending, startTransition] = useTransition()

    return (
        <div>
            <Dialog>
                <DialogTrigger
                    asChild
                >
                    <Button variant="outline">
                        Check Proof
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogDescription>
                        {transaction.gcashReciept ? (<>
                            <div
                                className='flex justify-center items-center flex-col'
                            >
                                <Image
                                    alt='user payment proof'
                                    src={transaction.gcashReciept}
                                    width={350}
                                    height={350}
                                    className='mb-3'
                                />
                                <h1 className='mt-3 text-gray-500 text-lg'>User's payment proof.</h1>
                                {transaction.paymentStatus === "Not Paid" && (
                                    <Button
                                        variant="default"
                                        className='bg-lime-500 hover:bg-lime-500/80 mt-3'
                                        isLoading={isPending}
                                        onClick={async () => {
                                            startTransition(() => {
                                                confirmProof(transaction.id).then((callback) => {
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
                                    >Confirm payment</Button>
                                )}

                            </div>
                        </>) : (
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
                                <h1 className='mt-3 text-gray-500 text-lg'>User has not paid yet.</h1>
                            </div>
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}
