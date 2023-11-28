"use client"

import { toast } from '@/lib/hooks/use-toast'
import { CommunitySchema, CommunityType } from '@/lib/validations/admin/createCommunity'
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

export const CreateCommunity = () => {
    const form = useForm<CommunityType>({
        resolver: zodResolver(CommunitySchema),
        defaultValues: {
            name: '',
        }
    })

    const { mutate: createCommunity, isLoading } = useMutation({
        mutationFn: async ({ name }: CommunityType) => {
            const payload: CommunityType = {
                name
            }

            const { data } = await axios.post("/api/admin/community", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 402) {
                    toast({
                        title: 'Error',
                        description: "Community already exists!",
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

    function onSubmit(values: CommunityType) {
        const payload: CommunityType = {
            name: values.name
        }

        createCommunity(payload)
        // console.log(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rank:</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter community" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}>Submit</Button>
            </form>
        </Form>
    )
}
