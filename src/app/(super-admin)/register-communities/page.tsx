"use client"

import { Button } from '@/app/components/Ui/Button';
import { Input } from '@/app/components/Ui/Input';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/components/Ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/app/components/Ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/Ui/select";
import { Textarea } from '@/app/components/Ui/textarea';
import { toast } from "@/lib/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { CreateEmployeeSchema, CreateEmployeeType } from "@/lib/validations/admin/createEmployee";
import { CreateCommunitySchema, CreateCommunityType } from '@/lib/validations/super-admin/createCommunity';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import axios, { AxiosError } from "axios";
import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterCommunitiesPage = () => {
    const form = useForm<CreateCommunityType>({
        resolver: zodResolver(CreateCommunitySchema),
    })

    const router = useRouter()

    const [imageUrl, setImageUrl] = useState<string>('')

    const imageIsEmpty = imageUrl.length === 0

    const { mutate: createEmployee, isLoading } = useMutation({
        mutationFn: async ({
            firstname,
            lastName,
            phone,
            gender,
            communityEmail,
            password,
            email,
            confirmPassword,
            communityName,
            communityAddress,
            communityDescription,
        }: CreateCommunityType) => {
            const payload: CreateCommunityType = {
                firstname,
                lastName,
                communityName,
                phone,
                email,
                gender,
                communityEmail,
                password,
                confirmPassword,
                communityAddress,
                communityDescription,
            }

            const { data } = await axios.post("/api/super-admin/createCommunity", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    toast({
                        title: 'Error',
                        description: "Email already exists!",
                        variant: 'destructive',
                    })
                }
                if (err.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: "Phone number already exists!",
                        variant: 'destructive',
                    })
                }
                if (err.response?.status === 402) {
                    toast({
                        title: 'Error',
                        description: "Community name already exists!",
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

            setTimeout(() => {
                router.push("/super-admin/register-communities")
                router.refresh()
            }, 1000)
        }
    })

    function onSubmit(values: CreateCommunityType) {
        const payload: CreateCommunityType = {
            email: values.email,
            firstname: values.firstname,
            lastName: values.lastName,
            phone: values.phone,
            gender: values.gender,
            communityEmail: values.communityEmail,
            communityName: values.communityName,
            communityAddress: values.communityAddress,
            communityDescription: values.communityDescription,
            // password: values.password,
            // confirmPassword: values.confirmPassword,
        }
        createEmployee(payload)
        // console.log('Form submitted with values:', payload);
        // console.log(payload)
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[#E3E1E1]">
            <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center p-11 rounded-3xl">
                <Card className="">
                    <div className="w-full h-full">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="font-bold text-lg mb-6">Community Registration</h1>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="communityName"
                                        render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Urban Farm Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Bagbag" {...field} type='text' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                    />
                                </div>

                                <div className="grid grid-cols-1">
                                    <FormField
                                            control={form.control}
                                            name="communityEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Urban Farm Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="@gmail.com" {...field} type='email' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                </div>

                                <div className="grid grid-cols-1">
                                    <FormField
                                            control={form.control}
                                            name="communityAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Urban Farm Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Blk 6 Lt 7" {...field} type='text' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                </div>

                                <div className='grid grid-cols-1'>
                                    <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact No.</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="09" {...field} type='number' className="" />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                </div>

                                <div className='grid grid-cols-1'>
                                    <FormField
                                        control={form.control}
                                        name="communityDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Urban Farm Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Markethub description...."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid grid-cols-1'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Admin Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="@gmail.com" {...field} type='email' />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full gap-7">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Firstname" {...field} type='text' className="" />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Lastname" {...field} type='text' className="" />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Gender</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                

                                {/* <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} type='password' />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Confirm Password" {...field} type='password' />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        className="bg-[#B84AEB] hover:bg-[#3d1a4e8f] w-full"
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </Card>
            </section>
        </div>
    )
}

export default RegisterCommunitiesPage