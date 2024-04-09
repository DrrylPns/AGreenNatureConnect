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
import { toast } from '@/lib/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AddStocksScehma, AddStocksType } from '@/lib/validations/employee/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, Variant } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { MinusCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateProductProps {
    product: Product & {
        variants: Variant[];
    } | null
}

export const AddStocks: React.FC<UpdateProductProps> = ({
    product
}) => {
    const router = useRouter()
    const [perMeasurementSlots, setPerMeasurementSlots] = useState([{ measurement: 0, price: 0, estPieces: '' }]);
    const [typeMeasurementProd, setTypeMeasurementProd] = useState<string>("")
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

    const perMeasurementValues = getPerMeasurementValues();


    const { mutate: addStocks, isLoading } = useMutation({
        mutationFn: async ({
            id,
            quantity,
            perMeasurement,
            typeOfMeasurement,
        }: AddStocksType) => {
            const payload: AddStocksType = {
                id: product?.id,
                quantity,
                perMeasurement,
                typeOfMeasurement,
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
            typeOfMeasurement: values.typeOfMeasurement,
            perMeasurement: values.perMeasurement,
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

                    {
                        perMeasurementSlots.map((slot, index) => (
                            <div key={`perMeasurement-${index}-price`} className="flex justify-evenly items-center gap-3 mb-3 w-full">
                                <FormField
                                    control={form.control}
                                    name={`perMeasurement[${index}].measurement` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#f7d126]">Variants</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Measurement"
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
                                    name={`perMeasurement[${index}].price` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#f7d126]">Price in Pesos</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter price"
                                                    {...field}
                                                    className="rounded-full"
                                                    type='number'
                                                // onChange={(e) => handlePriceChange(index, e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`perMeasurement[${index}].estPieces` as any}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#f7d126]">Est. piece/s</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Estimated Pieces"
                                                    {...field}
                                                    className="rounded-full"
                                                // onChange={(e) => handleEstPiecesChange(index, e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* {index > 0 && ( */}
                                <div className="flex items-center justify-center cursor-pointer"
                                    onClick={() => index > 0 && removePerMeasurementSlot(index)}
                                >
                                    <MinusCircle
                                        className="w-4 h-4 text-red-500 cursor-pointer flex items-center justify-center mt-9"
                                        strokeWidth={3}
                                    // onClick={() => removePerMeasurementSlot(index)}
                                    />
                                    {/* <h1 className='mt-1 ml-1 text-red-500 cursor-pointer' onClick={() => removePerMeasurementSlot(index)}>Remove Slot</h1> */}
                                </div>
                                {/* )} */}
                            </div>
                        ))
                    }

                    <div className='flex flex-row justify-start items-center w-full'>
                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
                            onClick={() => setPerMeasurementSlots([...perMeasurementSlots, { measurement: 0, price: 0, estPieces: '' }])}
                        >
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className='mt-1'>Add Slot</h1>
                        </div>
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
                                setTypeMeasurementProd(form.getValues("typeOfMeasurement") as string)
                                setQuantityProd(form.getValues("quantity"))
                            }}
                            disabled={
                                isLoading
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

                                <div className='flex flex-col w-full justify-center ml-7 mt-5 mb-3'>
                                    <div className='flex justify-between font-bold text-black mb-2'>
                                        <div className='flex-none w-1/3'>
                                            Variants
                                        </div>
                                        <div className='flex-none w-1/3'>
                                            Price in Pesos
                                        </div>
                                        <div className='flex-none w-1/3'>
                                            Est. Piece/s
                                        </div>
                                    </div>

                                    {perMeasurementValues.map((slot, index) => (
                                        <div key={index} className='flex justify-between mb-2'>
                                            <div className='flex-none w-1/3'>
                                                {slot.measurement as number > 0 && (
                                                    <div>
                                                        <span className=' text-black ml-1'>{slot.measurement as number}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex-none w-1/3'>
                                                {slot.price as number > 0 && (
                                                    <div>
                                                        <span className=' text-black ml-1'>{slot.price as number}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex-none w-1/3'>
                                                {typeof slot.estPieces === 'string' && slot.estPieces && (
                                                    <div>
                                                        <span className=' text-black ml-1'>{slot.estPieces}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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
