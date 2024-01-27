"use client"

import { toast } from '@/lib/hooks/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/Ui/form"
import { Input } from '@/app/components/Ui/Input'
import { Button } from '@/app/components/Ui/Button'
import { User } from '@prisma/client'
import { CreateProductSchema, CreateProductType } from '@/lib/validations/employee/products'
import ImageUpload from '@/app/components/image-upload'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CreateProduct = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [formStep, setFormStep] = useState(0)
    const [perKiloSlots, setPerKiloSlots] = useState([{ price: '', estPieces: '' }]);
    const [perPackSlots, setPerPackSlots] = useState([{ price: '', estPieces: '' }]);
    const router = useRouter()

    const imageIsEmpty = imageUrl.length === 0

    const form = useForm<CreateProductType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            productImage: '',
            name: '',
            category: '',
            // price: 0,
        }
    })

    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: async ({
            productImage,
            name,
            category,
            quantity,
            // estPiecesKilo,
            // estPiecesPack,
            perKilo,
            perPack,
            // price,
        }: CreateProductType) => {
            const payload: CreateProductType = {
                productImage,
                category,
                name,
                quantity,
                // estPiecesKilo,
                // estPiecesPack,
                perKilo,
                perPack,
                // price,
            }

            const { data } = await axios.post("/api/employee/products", payload)
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
                if (err.response?.status === 402) {
                    toast({
                        title: 'Invalid Action',
                        description: "Please put a valid price!",
                        variant: 'destructive',
                    })
                }
                if (err.response?.status === 403) {
                    toast({
                        title: 'Invalid Action',
                        description: "Please put a valid weight!",
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
            router.push("/employee/inventory")
        }
    })

    function onSubmit(values: CreateProductType) {
        const payload: CreateProductType = {
            productImage: imageUrl,
            category: values.category,
            name: values.name,
            quantity: values.quantity,
            perKilo: values.perKilo,
            perPack: values.perPack,
            // estPiecesKilo: values.estPiecesKilo,
            // estPiecesPack: values.estPiecesPack,
            // price: values.price,
        }
        // toast({
        //     title: "Data",
        //     description: JSON.stringify(payload, null, 4)
        // })

        // console.log(payload)

        createProduct(payload)
    }

    // console.log(form.watch())

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full bg-[#24643B] p-[24px] rounded-lg">
                {/* <ImageUpload /> */}

                {/* STEP 1 */}
                <div className={
                    cn('space-y-3', {
                        'hidden': formStep == 1
                    })
                }>
                    {/* UPLOADTHING IMAGE UPLOADER CODE */}
                    <FormLabel className='text-[#f7d126]'>Product Image</FormLabel>
                    <div>
                        {imageUrl.length ? <div className='w-full flex justify-center items-center flex-col'>
                            <Button
                                variant="default"
                                className='bg-white text-black mb-3 hover:bg-white/80'
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
                            className="text-green"
                            appearance={{
                                button: "bg-slate-700 p-2",
                                label: "text-white",
                                allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-white",
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

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#f7d126]'>Name of the Product</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Name" {...field} className='rounded-full' />
                                    {/* <Input placeholder={`${product.id}`} {...field} /> */}
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*  Quantity */}
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#f7d126]'>Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter value" {...field} type='number' className='rounded-full' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#f7d126]'>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" className='rounded-full' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Fruits">Fruits</SelectItem>
                                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* STEP 2 */}
                <div className={
                    cn('space-y-6 h-full', {
                        'hidden': formStep == 0
                    })
                }>

                    {/* Per Kilo */}
                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-[#f7d126] font-bold'>Per Kilogram</h1>
                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
                            onClick={() => setPerKiloSlots([...perKiloSlots, { price: '', estPieces: '' }])}
                        >
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className=''>Add Slot</h1>
                        </div>
                    </div>
                    {perKiloSlots.map((slot, index) => (
                        <div key={`perKilo-${index}-price`} className="flex justify-evenly items-center gap-3 mb-3 ">
                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].kilo` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Kilo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter kilo" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].price` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter price" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].estPieces` as any}

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Est.Pieces</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Estimated Pieces" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    {/* Per Pack */}
                    {/* <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-[#f7d126] font-bold'>Per Pack</h1>

                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'>
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className=''>Add Slot</h1>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-3 w-full'>
                        <FormField
                            control={form.control}
                            name="perPack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#f7d126]'>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter pack" {...field} className='w-50% rounded-full' type='number' />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="estPiecesPack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#f7d126]'>Est.Pieces</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Estimated Pieces" {...field} className='w-50 rounded-full' />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div> */}

                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-[#f7d126] font-bold'>Per Pack</h1>

                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
                            onClick={() => setPerPackSlots([...perPackSlots, { price: '', estPieces: '' }])}
                        >
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className=''>Add Slot</h1>
                        </div>
                    </div>
                    {perPackSlots.map((slot, index) => (
                        <div key={`perPack-${index}-price`} className="flex justify-between items-center gap-3 mb-3 ">
                            <FormField
                                control={form.control}
                                name={`perPack[${index}].pack` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Pack</FormLabel>
                                        <FormControl>

                                            <Input placeholder="Enter pack" {...field} className="w-50% rounded-full" type='number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perPack[${index}].price` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Price</FormLabel>
                                        <FormControl>

                                            <Input placeholder="Enter price" {...field} className="w-50% rounded-full" type='number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perPack[${index}].estPieces` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Est.Pieces</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Estimated Pieces" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 justify-end w-full space-y-11">
                    <Button
                        type='button'
                        variant="ghost"
                        className={
                            cn('bg-transparent hover:bg-opacity-30 text-black font-bold', {
                                'hidden': formStep == 1
                            })
                        }
                        onClick={() => {
                            form.trigger(['productImage', 'name', 'quantity', 'category'])

                            const imageState = form.getFieldState('productImage')
                            const nameState = form.getFieldState('name')
                            const quantityState = form.getFieldState('quantity')
                            const categoryState = form.getFieldState('category')

                            if (imageUrl.length === 0) {
                                toast({
                                    title: "Warning!",
                                    description: "Product image is required!",
                                    variant: "destructive",
                                })
                            }
                            if (!nameState.isDirty || nameState.invalid) return;
                            if (!quantityState.isDirty || quantityState.invalid) return;
                            if (!categoryState.isDirty || categoryState.invalid) return;

                            setFormStep(1)
                        }}
                    >
                        Next Step <ArrowRight className='w-4 h-4 ml-2 font-bold' />
                    </Button>

                    <Button
                        type='button'
                        variant="ghost"
                        className={
                            cn('bg-transparent hover:bg-opacity-30 text-black font-bold', {
                                'hidden': formStep == 0
                            })
                        }
                        onClick={() => {
                            setFormStep(0)
                        }}
                    >
                        Back <ArrowLeft className='w-4 h-4 ml-2 font-bold' />
                    </Button>
                    <Button
                        type="submit"
                        variant="newGreen"
                        className={
                            cn('bg-[#D9D9D9] text-[#24643B]', {
                                'hidden': formStep == 0
                            })
                        }
                        isLoading={isLoading}
                        disabled={imageIsEmpty || isLoading}
                    >
                        Save</Button>
                </div>

            </form >
        </Form >
    )
}

export default CreateProduct