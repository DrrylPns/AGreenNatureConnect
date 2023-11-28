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
import { User } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover'
import { cn } from '@/lib/utils'
import { ArrowDownUp, CheckIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/app/components/Ui/command'

interface CreateCommunityProps {
    user: User[]
}

export const CreateCommunity = ({ user }: CreateCommunityProps) => {
    const form = useForm<CommunityType>({
        resolver: zodResolver(CommunitySchema),
        defaultValues: {
            name: '',
        }
    })

    const { mutate: createCommunity, isLoading } = useMutation({
        mutationFn: async ({ users, name }: CommunityType) => {
            const payload: CommunityType = {
                users,
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
            users: values.users,
            name: values.name
        }

        createCommunity(payload)
        // console.log(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="users"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Community Master:</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? user.find(
                                                    //     (master) => language.value === field.value
                                                    //   )?.label
                                                    (master) => master.id === field.value
                                                )?.name
                                                : "Select community master"}
                                            <ArrowDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search people..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>No people found.</CommandEmpty>
                                        <CommandGroup>
                                            {user.map((user) => (
                                                <CommandItem
                                                    value={user.name as string}
                                                    key={user.id}
                                                    onSelect={() => {
                                                        form.setValue("users", user.id as string)
                                                    }}
                                                >
                                                    {user.name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            user.name === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the one who will manage the whole community.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Community name:</FormLabel>
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
