"use client"
import { Button } from '@/app/components/Ui/Button';
import { Input } from '@/app/components/Ui/Input';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/Ui/alert-dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/app/components/Ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select';
import { cn } from '@/lib/utils';
import { UpdateStocksSchema, UpdateStocksType } from '@/lib/validations/employee/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { updateStocks } from '../../../../../../../actions/products';
import { toast } from '@/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
    product: Product & {
       
    } | null
}

export const UpdateStocks: React.FC<Props> = ({
    product
}) => {
    const [typeMeasurementProd, setTypeMeasurementProd] = useState<string>("")
    const [quantityProd, setQuantityProd] = useState<number>()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<UpdateStocksType>({
        resolver: zodResolver(UpdateStocksSchema),
    })


    // function onSubmit(values: UpdateStocksType) {
    //     startTransition(() => {
    //         updateStocks(product?.id, values)
    //             .then((data) => {
    //                 if (data.error) toast({
    //                     description: data.error,
    //                     variant: "destructive"
    //                 })

    //                 if (data.success) {
    //                     toast({
    //                         description: data.success
    //                     })
    //                 }
    //             })
    //     })
    // }

    const onSubmit = async (values: UpdateStocksType) => {
        startTransition(() => {
            updateStocks(product?.id, values).then((data) => {
                //@ts-ignore
                if (data.error) {
                    toast({
                        //@ts-ignore
                        description: data.error,
                        variant: "destructive"
                    })

                    router.push("/employee/inventory")
                }
                //@ts-ignore
                if (data.success) {
                    toast({
                        //@ts-ignore
                        description: data.success,
                    })

                    router.push("/employee/inventory")
                }
            })
        })
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full bg-[#24643B] p-[24px] rounded-lg">
                <div className={
                    cn('h-full')
                }>

                    <h1 className='text-[#f7d126] mb-5 font-bold'>
                        Add stocks to {product?.name}
                    </h1>
                    <div className='flex flex-row items-center justify-center w-full gap-11 space-x-3 mb-11'>
                        <FormField
                            control={form.control}
                            name="typeOfMeasurement"
                            render={({ field }) => (
                                <FormItem className='w-[221px]'>
                                    <FormLabel className='text-[#f7d126]'>Unit of Measurement</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" className='rounded-full' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Kilograms">Kilograms</SelectItem>
                                            <SelectItem value="Grams">Grams</SelectItem>
                                            <SelectItem value="Pieces">Pieces</SelectItem>
                                            <SelectItem value="Pounds">Pounds (lbs)</SelectItem>
                                            <SelectItem value="Packs">Packs</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#f7d126]'>Total Number of Stocks</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} type='number' className='rounded-full' />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='h-[1px]' />
                </div >

                <AlertDialog>
                    <div className='w-full flex justify-end'>
                        <AlertDialogTrigger
                            className={
                                cn('bg-white text-black hover:bg-white/80 active:scale-95 inline-flex items-end justify-end rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 px-10 py-3', {

                                })
                            }
                            onClick={() => {
                                setTypeMeasurementProd(form.getValues("typeOfMeasurement") as string)
                                setQuantityProd(form.getValues("quantity"))
                            }}
                            disabled={
                                isPending
                            }
                        >Update</AlertDialogTrigger>
                    </div>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Update</AlertDialogTitle>
                            <AlertDialogDescription>
                                Note: By clicking continue you agree to add stocks to the selected products.

                                <div className='flex flex-row justify-between mt-2'>
                                    <div>
                                        Unit of Measurement:
                                        <span className='font-bold text-black ml-1'>
                                            {typeMeasurementProd}
                                        </span>
                                    </div>
                                    <div>
                                        Total Number of Stocks:
                                        <span className='font-bold text-black ml-1'>
                                            {quantityProd}
                                        </span>
                                    </div>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className='bg-[#099073] hover:bg-[#099073]/80'>Cancel</AlertDialogCancel>
                            <Button
                                type="submit"
                                variant="newGreen"
                                className={
                                    cn('bg-[#099073] hover:bg-[#099073]/80', {
                                        // 'hidden': formStep == 0
                                    })
                                }
                                isLoading={isPending}
                                onClick={() => {
                                    form.handleSubmit(onSubmit)()
                                }}
                            >
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </Form>
    )
}
