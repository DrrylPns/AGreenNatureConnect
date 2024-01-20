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

const CreateProduct = () => {
    const [imageUrl, setImageUrl] = useState<string>('')

    const imageIsEmpty = imageUrl.length === 0

    const form = useForm<CreateProductType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            productImage: '',
            name: '',
            kilo: 0,
            price: 0,
        }
    })

    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: async ({
            productImage,
            kilo,
            name,
            price
        }: CreateProductType) => {
            const payload: CreateProductType = {
                productImage,
                kilo,
                name,
                price,
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
            toast({
                title: 'Success!',
                description: `${data}`,
                variant: 'default',
            })
        }
    })

    function onSubmit(values: CreateProductType) {
        const payload: CreateProductType = {
            productImage: imageUrl,
            kilo: values.kilo,
            name: values.name,
            price: values.price,
        }

        createProduct(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-[#24643B] p-[24px] rounded-lg">
                {/* <ImageUpload /> */}

                {/* UPLOADTHING IMAGE UPLOADER CODE */}

                <FormLabel className='text-[#f7d126]'>Product Image</FormLabel>
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
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#f7d126]'>Name of the Product</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Name" {...field} />
                                {/* <Input placeholder={`${product.id}`} {...field} /> */}
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#f7d126]'>Quantity</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your price" {...field} type='number' />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kilo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#f7d126]'>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Kilo" {...field} type='number' />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant="newGreen"
                    className='bg-[#D9D9D9] text-[#24643B]'
                    isLoading={isLoading}
                    disabled={imageIsEmpty}
                >
                    Save</Button>
            </form>
        </Form>
    )
}

export default CreateProduct