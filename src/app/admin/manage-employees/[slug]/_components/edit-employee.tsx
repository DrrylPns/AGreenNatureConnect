"use client"

import { Input } from '@/app/components/Ui/Input'
import { Button } from '@/app/components/Ui/Button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/Ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/Ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/components/Ui/drawer"
import { ImageDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { UpdateEmployeeSchema, UpdateEmployeeType } from '@/lib/validations/admin/updateEmployee';
import { useRouter } from 'next/navigation';


interface EditEmployeeProps {
    employee: any;
}

export const EditEmployee: React.FC<EditEmployeeProps> = ({
    employee
}) => {

    const router = useRouter()

    if (!employee || !employee.Community) {
        return <div>Loading...</div>;
    }

    const form = useForm<UpdateEmployeeType>({
        resolver: zodResolver(UpdateEmployeeSchema),
        defaultValues: {
            employeeId: employee.EmployeeId as string,
            firstname: employee?.name as string,
            lastName: employee?.lastName as string,
            phone: employee?.phoneNumber as string,
            gender: employee?.gender as string,
            address: employee?.address as string,
        }
    })

    const [imageUrl, setImageUrl] = useState<string>(employee.image as string)

    const imageIsEmpty = imageUrl.length === 0

    const { mutate: updateEmployee, isLoading } = useMutation({
        mutationFn: async ({
            avatar,
            employeeId,
            firstname,
            lastName,
            phone,
            gender,
            address,
        }: UpdateEmployeeType) => {
            const payload: UpdateEmployeeType = {
                avatar,
                employeeId,
                firstname,
                lastName,
                phone,
                gender,
                address,
            }

            const { data } = await axios.put("/api/admin/employees", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                // if (err.response?.status === 400) {
                //     toast({
                //         title: 'Error',
                //         description: "Email already exists!",
                //         variant: 'destructive',
                //     })
                // }
                if (err.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: "Phone number already exists!",
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
                router.push("/admin/manage-employees")
                router.refresh()
            }, 1000)
        }
    })

    function onSubmit(values: UpdateEmployeeType) {
        const payload: UpdateEmployeeType = {
            avatar: imageUrl,
            employeeId: values.employeeId,
            firstname: values.firstname,
            lastName: values.lastName,
            phone: values.phone,
            gender: values.gender,
            address: values.address,
        }

        updateEmployee(payload)
        console.log('Form submitted with values:', payload);
        // console.log(payload)
    }

    return (
        <div className="w-full flex justify-center items-center bg-[#E3E1E1]">
            <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center p-11 lg:w-[740px] rounded-3xl">
                {/* <Card className="lg:w-[570px]"> */}
                <div className="w-full h-full">
                    <div className='w-full flex items-center justify-end px-2'>
                        <div className='w-full flex items-start justify-start'>
                            <h1 className="font-bold text-lg text-[#696969]">Farmer ID: {employee.EmployeeId}</h1>
                        </div>
                        {/* <Button
                            variant="destructive"
                            className='w-[30%]'
                        >
                            Resign / Fired
                        </Button> */}
                    </div>
                    <div className="w-full">

                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full lg:mt-[100px]">

                            <Drawer>
                                <DrawerTrigger asChild>
                                    {imageUrl.length ?
                                        <div className="lg:-mb-[64px] lg:-mt-[200px]">
                                            {/* <Image
                                                src={imageUrl}
                                                alt="productImage"
                                                className="cursor-pointer rounded-full border border-black/60 lg:-ml-[77px] mb-[74px] w-[140px] h-[140px]"
                                                width={70}
                                                height={70}
                                                onClick={() => {
                                                    setImageUrl("")
                                                }}
                                            /> */}
                                            <Image
                                                src={imageUrl}
                                                alt="farmer photo"
                                                width={70}
                                                height={70}
                                                className="cursor-pointer rounded-full w-[140px] h-[140px] border border-black/60 lg:-ml-[77px] -mt-[274px] mb-[104px]"
                                                unoptimized
                                                quality={100}
                                            />

                                        </div>

                                        : <div className="lg:-mb-[64px] lg:-mt-[200px]">
                                            {/* <Button variant="outline" className="rounded-full w-[140px] h-[140px] border-black/60 border lg:-ml-[77px] -mt-[274px] mb-[104px]">
                                                <ImageDown strokeWidth={1} size={32} />
                                            </Button> */}

                                            <div className="rounded-full w-[140px] h-[140px] border-black/60 border lg:-ml-[77px] -mt-[274px] mb-[104px] cursor-pointer bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                                                <ImageDown strokeWidth={1} size={32} />
                                            </div>
                                        </div>}

                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>{
                                            imageUrl ? "Change Profile" : "Choose Profile"
                                        }</DrawerTitle>
                                        <DrawerDescription>{
                                            imageUrl ? "Note: This will change the picture of the farmer." : "Note: This will be the picture of the farmer."
                                        }</DrawerDescription>

                                        <DrawerDescription>
                                            <div className='text-rose-500'>Click cancel or outside the drawer if you are done setting up the profile.</div>

                                            {imageUrl.length ? <div
                                                className='flex justify-center items-center flex-col'
                                            >

                                                <Image
                                                    alt='Done Upload'
                                                    src={"/images/employee/done_upload.svg"}
                                                    width={250}
                                                    height={250}
                                                    className='mb-3'
                                                />
                                                <h1 className='mt-3 text-gray-500'>Uploaded Successfully</h1>
                                            </div> : <UploadDropzone
                                                className="text-green"
                                                appearance={{
                                                    button: "bg-[#099073] p-2",
                                                    label: "text-green",
                                                    allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                                                }}
                                                endpoint="changeAvatar"
                                                onClientUploadComplete={(res) => {
                                                    console.log('Files: ', res);
                                                    if (res && res.length > 0 && res[0].url) {
                                                        setImageUrl(res[0].url);
                                                    } else {
                                                        console.error('Please input a valid product image.', res);
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        title: 'Error!',
                                                        description: error.message,
                                                        variant: 'destructive',
                                                    })
                                                }}
                                            />}
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <div className="flex flex-col gap-3 w-full items-center justify-center">
                                            <Button variant="newGreen" className={`w-[320px] ${!imageUrl && 'hidden'}`} onClick={() => {
                                                if (imageUrl) {
                                                    setImageUrl("")
                                                }
                                            }}>
                                                Change
                                            </Button>
                                        </div>
                                        <DrawerClose>
                                            <div className="flex flex-col gap-3 w-full items-center justify-center">

                                                <Button
                                                    variant="outline"
                                                    className="w-[320px]"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>

                            <div className='hidden'>
                                <FormField
                                    control={form.control}
                                    name="employeeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>FarmerId</FormLabel>
                                            <FormControl>
                                                <Input placeholder="FarmerId" {...field} type='text' className="w-[310px]" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-row justify-center items-center w-full gap-7">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Firstname" {...field} type='text' className="w-[310px]" />
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
                                                <Input placeholder="Lastname" {...field} type='text' className="w-[310px]" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-row justify-center items-center w-full gap-5">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact No.</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contact" {...field} type='number' className="w-[312px]" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="w-[312px]">
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

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address" {...field} type='text' />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="w-full">
                                <Button
                                    type="submit"
                                    className="bg-[#4CAF50] hover:bg-[#4CAF50]/70 w-full"
                                    isLoading={isLoading}
                                    disabled={isLoading || imageIsEmpty}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                {/* </Card> */}
            </section>
        </div>
    )
}
