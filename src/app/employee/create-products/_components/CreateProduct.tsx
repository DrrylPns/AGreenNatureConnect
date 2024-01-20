"use client"

import { toast } from '@/lib/hooks/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React from 'react'
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

const CreateProduct = () => {
    const form = useForm<CreateProductType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            name: '',
            kilo: 0,
            price: 0,
        }
    })

    const { mutate: createCommunity, isLoading } = useMutation({
        mutationFn: async ({
            kilo,
            name,
            price
        }: CreateProductType) => {
            const payload: CreateProductType = {
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
            kilo: values.kilo,
            name: values.name,
            price: values.price,
        }

        createCommunity(payload)
        // console.log(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
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
                            <FormLabel>Price (PHP)</FormLabel>
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
                            <FormLabel>Kilo (kg)</FormLabel>
                            <FormControl>
                                <Input placeholder="Kilo" {...field} type='number' />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant="green"
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    Submit</Button>
            </form>
        </Form>
    )
}

export default CreateProduct