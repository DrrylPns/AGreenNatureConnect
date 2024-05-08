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
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select';
import { toast } from '@/lib/hooks/use-toast';
import { cn, formatDate } from '@/lib/utils';
import { AddStocksScehma, AddStocksType } from '@/lib/validations/employee/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { MinusCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from "date-fns"
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from "lucide-react"

interface UpdateProductProps {
    product: Product & {
    } | null
}

export const AddStocks: React.FC<UpdateProductProps> = ({
    product
}) => {
    const router = useRouter()
    const [perMeasurementSlots, setPerMeasurementSlots] = useState([{ measurement: 0, price: 0, estPieces: '' }]);
    const [typeMeasurementProd, setTypeMeasurementProd] = useState<string>("")
    const [harvestedFrom, setHarvestedFrom] = useState<string>("")
    const [quantityProd, setQuantityProd] = useState<number>()

    const form = useForm<AddStocksType>({
        resolver: zodResolver(AddStocksScehma),
        defaultValues: {
            id: product?.id,
        }
    })

    const removePerMeasurementSlot = (indexToRemove: any) => {
        setPerMeasurementSlots((prevSlots) => prevSlots.filter((_, index) => index !== indexToRemove));
    };

    const getPerMeasurementValues = () => {
        return perMeasurementSlots.map((slot, index) => ({
            //@ts-ignore
            measurement: form.getValues(`perMeasurement[${index}].measurement`),
            //@ts-ignore
            price: form.getValues(`perMeasurement[${index}].price`),
            //@ts-ignore
            estPieces: form.getValues(`perMeasurement[${index}].estPieces`),
        }));
    };


    const { mutate: addStocks, isLoading } = useMutation({
        mutationFn: async ({
            id,
            quantity,
            harvestedFrom,
            expiration
        }: AddStocksType) => {
            const payload: AddStocksType = {
                id: product?.id,
                quantity,
                harvestedFrom,
                expiration
            }

            const { data } = await axios.put("/api/employee/addstocks", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: "Unauthorized",
                        variant: 'destructive',
                    })
                }
                // if (err.response?.status === 402) {
                //     toast({
                //         title: 'Invalid Action',
                //         description: "Please put a valid price!",
                //         variant: 'destructive',
                //     })
                // }
                // if (err.response?.status === 403) {
                //     toast({
                //         title: 'Invalid Action',
                //         description: "Please put a valid weight!",
                //         variant: 'destructive',
                //     })
                // }
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
                title: "Success!",
                description: "You have added a stock!",
                variant: "default",
            })
            router.push("/employee/inventory")
        }
    })


    function onSubmit(values: AddStocksType) {
        const payload: AddStocksType = {
            id: product?.id,
            // productImage: imageUrl,
            // category: values.category,
            // name: values.name,
            quantity: values.quantity,
            harvestedFrom: values.harvestedFrom,
            expiration: values.expiration
        }

        addStocks(payload)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full bg-[#24643B] p-[24px] rounded-lg">
                <div className={
                    cn('h-full', {
                        // 'hidden': formStep == 0
                    })
                }>

                    <h1 className='text-[#f7d126] mb-5 font-bold'>
                        Add stocks to {product?.name}
                    </h1>

                    <div>
                        <FormField
                            control={form.control}
                            name={`quantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#f7d126]">Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the number of quantity in kg"
                                            {...field}
                                            className="rounded-full"
                                            type='number'
                                        // onChange={(e) => handleMeasurementChange(index, e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`harvestedFrom`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#f7d126]">Harvested From</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Farm name"
                                            {...field}
                                            className="rounded-full"
                                            type='text'
                                        // onChange={(e) => handleMeasurementChange(index, e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expiration"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='text-[#f7d126] inline w-full'>Expiration Date</FormLabel>
                                <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div >

                <AlertDialog>
                    <div className='w-full flex justify-end'>
                        <AlertDialogTrigger
                            className={
                                cn('bg-white text-black hover:bg-white/80 active:scale-95 inline-flex items-end justify-end rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 px-10 py-3', {

                                })
                            }
                            onClick={() => {
                                setHarvestedFrom(form.getValues("harvestedFrom") as string)
                                setQuantityProd(form.getValues("quantity"))
                            }}
                            disabled={
                                isLoading
                            }
                        >Add</AlertDialogTrigger>
                    </div>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add new stock</AlertDialogTitle>
                            <AlertDialogDescription>
                                Note: By clicking continue you agree to add stocks to the selected products.

                                <div className='flex flex-col justify-between mt-2'>
                                    <div>
                                        Total quantity to add in stock:
                                        <span className='font-bold text-black ml-1'>
                                            {quantityProd}Kg
                                        </span>
                                    </div>
                                    <div>
                                        Harvested From:
                                        <span className='font-bold text-black ml-1'>
                                            {harvestedFrom}
                                        </span>
                                    </div>
                                    <div>
                                        Expiration Date:
                                        <span className='font-bold text-black ml-1'>
                                            {formatDate(form.getValues("expiration")) }
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
                                // isLoading={isLoading}
                                // disabled={imageIsEmpty || isLoading}
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
