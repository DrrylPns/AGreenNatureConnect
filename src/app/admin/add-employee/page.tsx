"use client"

// import { Button } from "@/app/components/Ui/Button";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/Ui/select";
// import { CreateEmployeeSchema, CreateEmployeeType } from "@/lib/validations/admin/createEmployee";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react"
// import { SubmitHandler, useForm } from "react-hook-form";
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/app/components/Ui/drawer"
// import Image from "next/image";
// import { ImageDown } from "lucide-react";
// import { UploadDropzone } from "@/lib/uploadthing";
// import { toast } from "@/lib/hooks/use-toast";




import { Input } from '@/app/components/Ui/Input'
import { Button } from '@/app/components/Ui/Button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/Ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/Ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { CreateEmployeeSchema, CreateEmployeeType } from "@/lib/validations/admin/createEmployee";
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
import { useRouter } from 'next/navigation';

const page = () => {
    const form = useForm<CreateEmployeeType>({
        resolver: zodResolver(CreateEmployeeSchema),
    })

    const router = useRouter()

    const [imageUrl, setImageUrl] = useState<string>('')

    const imageIsEmpty = imageUrl.length === 0

    const { mutate: createEmployee, isLoading } = useMutation({
        mutationFn: async ({
            avatar,
            firstname,
            lastName,
            phone,
            gender,
            email,
            address,
            password,
            confirmPassword,
        }: CreateEmployeeType) => {
            const payload: CreateEmployeeType = {
                avatar,
                firstname,
                lastName,
                phone,
                gender,
                email,
                address,
                password,
                confirmPassword,
            }

            const { data } = await axios.post("/api/admin/employees", payload)
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

    function onSubmit(values: CreateEmployeeType) {
        const payload: CreateEmployeeType = {
            avatar: imageUrl,
            firstname: values.firstname,
            lastName: values.lastName,
            phone: values.phone,
            gender: values.gender,
            email: values.email,
            address: values.address,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }
        createEmployee(payload)
        // console.log('Form submitted with values:', payload);
        // console.log(payload)
    }



    // -> normal react-hook-forms

    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     formState: { errors },
    // } = useForm<CreateEmployeeType>({
    //     resolver: zodResolver(CreateEmployeeSchema),
    // });

    // const handleSelectChange = (value: string | null) => {
    //     // Check for null and handle accordingly
    //     const communityValue = value !== null ? value : ""; // or provide a default value

    //     setValue('gender', communityValue);
    //     console.log('Selected community:', communityValue);
    // };

    // // const onSubmit: SubmitHandler<CreateEmployeeType> = (data: CreateEmployeeType) => {
    // //     console.log("TESTING PLEASE WORK??", { ...data })
    // // }

    // function onSubmit(values: CreateEmployeeType) {
    //     const payload: CreateEmployeeType = {
    //         avatar: imageUrl,
    //         firstname: values.firstname,
    //         lastName: values.lastName,
    //         phone: values.phone,
    //         gender: values.gender,
    //         email: values.email,
    //         address: values.address,
    //         password: values.password,
    //         confirmPassword: values.confirmPassword,
    //     }
    //     console.log('Form submitted with values:', payload);
    //     // createEmployee(payload)
    //     // console.log(payload)
    // }

    return (
        // -> normal react-hook-forms

        // <>

        //     <form onSubmit={handleSubmit(onSubmit)}>

        //         <Drawer>
        //             <DrawerTrigger asChild>
        //                 {imageUrl.length ?
        //                     // <div className="lg:-mb-[64px] lg: -mt-[100px]">
        //                     <div className="">
        //                         <Image
        //                             src={imageUrl}
        //                             alt="productImage"
        //                             // className="cursor-pointer rounded-full border border-black/60 lg:-ml-[77px]"
        //                             className=""
        //                             width={70}
        //                             height={70}
        //                             onClick={() => {
        //                                 setImageUrl("")
        //                             }}
        //                         />
        //                     </div>

        //                     : <div className="">
        //                         {/* : <div className="lg:-mb-[64px] lg: -mt-[100px]"> */}
        //                         <Button variant="outline" className="rounded-full w-[70px] h-[70px] border-black/60 border">
        //                             {/* <Button variant="outline" className="rounded-full w-[70px] h-[70px] border-black/60 border lg:-ml-[77px]"> */}
        //                             <ImageDown strokeWidth={1} size={32} />
        //                         </Button>
        //                     </div>}

        //             </DrawerTrigger>
        //             <DrawerContent>
        //                 <DrawerHeader>
        //                     <DrawerTitle>Choose Avatar</DrawerTitle>
        //                     <DrawerDescription>Note: This will be the picture of the employee.</DrawerDescription>

        //                     {imageUrl.length ? <>
        //                     </> : <UploadDropzone
        //                         className="text-green"
        //                         appearance={{
        //                             button: "bg-[#099073] p-2",
        //                             label: "text-green",
        //                             allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
        //                         }}
        //                         endpoint="changeAvatar"
        //                         onClientUploadComplete={(res) => {
        //                             console.log('Files: ', res);
        //                             if (res && res.length > 0 && res[0].url) {
        //                                 setImageUrl(res[0].url);
        //                             } else {
        //                                 console.error('Please input a valid product image.', res);
        //                                 // Handle the case when the response is not as expected
        //                             }
        //                         }}
        //                         onUploadError={(error: Error) => {
        //                             toast({
        //                                 title: 'Error!',
        //                                 description: error.message,
        //                                 variant: 'destructive',
        //                             })
        //                         }}
        //                     />}
        //                 </DrawerHeader>
        //                 <DrawerFooter>
        //                     <DrawerClose>
        //                         <div className="flex flex-col gap-3 w-full items-center justify-center">
        //                             <Button variant="newGreen" className="w-[320px]">Done</Button>
        //                             <Button
        //                                 variant="outline"
        //                                 className="w-[320px]"
        //                                 onClick={() => {
        //                                     setImageUrl("")
        //                                 }}>Cancel</Button>
        //                         </div>
        //                     </DrawerClose>
        //                 </DrawerFooter>
        //             </DrawerContent>
        //         </Drawer>

        //         <label htmlFor="firstname">First Name:</label>
        //         <input
        //             type="text"
        //             id="firstname"
        //             {...register("firstname")}
        //         />

        //         <label htmlFor="firstname">address</label>
        //         <input
        //             type="text"
        //             id="address"
        //             {...register("address")}
        //         />

        //         <label htmlFor="firstname">confirmPassword</label>
        //         <input
        //             type="password"
        //             id="confirmPassword"
        //             {...register("confirmPassword")}
        //         />

        //         <label htmlFor="firstname">email</label>
        //         <input
        //             type="email"
        //             id="email"
        //             {...register("email")}
        //         />

        //         <label htmlFor="firstname">lastName</label>
        //         <input
        //             type="text"
        //             id="lastName"
        //             {...register("lastName")}
        //         />

        //         <label htmlFor="firstname">password</label>
        //         <input
        //             type="password"
        //             id="password"
        //             {...register("password")}
        //         />

        //         <label htmlFor="firstname">phone</label>
        //         <input
        //             type="number"
        //             id="phone"
        //             {...register("phone")}
        //         />

        //         <Select
        //             {...register('gender')}
        //             onValueChange={handleSelectChange}
        //         >
        //             <SelectTrigger className="
        //             md:w-[620px]
        //             rounded-full
        //             h-[50px]
        //             p-4
        //             mb-8
        //             dark:bg-[#09090B]
        //             font-light
        //             bg-white
        //             border-2
        //             outline-none
        //             transition
        //             disabled:opacity-70
        //             disabled:cursor-not-allowed">
        //                 <SelectValue placeholder="Select gender" />
        //             </SelectTrigger>
        //             <SelectContent>
        //                 <SelectGroup>
        //                     <SelectLabel>Gender</SelectLabel>
        //                     <SelectItem value="Male">Male</SelectItem>
        //                     <SelectItem value="Female">Female</SelectItem>
        //                     <SelectItem value="Other">Other</SelectItem>
        //                 </SelectGroup>
        //             </SelectContent>
        //         </Select>

        //         <Button
        //             variant='green'
        //             className="bg-[#4DE69E]  duration-300 rounded-xl w-[300px] h-[50px] font-bold md:w-[620px] md:h-[50px] text-black md:mb-5">
        //             TEST
        //         </Button>
        //     </form>
        // </>



        // original code ->>>

        <div className="w-full flex justify-center items-center bg-[#E3E1E1]">
            <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center p-11 lg:w-[740px] rounded-3xl">
                <Card className="lg:w-[570px]">
                    <div className="w-full h-full">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="font-bold text-lg mb-5">Employee Registration</h1>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full lg:mt-[100px]">
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        {imageUrl.length ?
                                            <div className="lg:-mb-[64px] lg:-mt-[200px]">
                                                <Image
                                                    src={imageUrl}
                                                    alt="productImage"
                                                    className="cursor-pointer rounded-full border border-black/60 lg:-ml-[77px] mb-[74px] w-[70px] h-[70px]"
                                                    width={70}
                                                    height={70}
                                                    onClick={() => {
                                                        setImageUrl("")
                                                    }}
                                                />
                                            </div>

                                            : <div className="lg:-mb-[64px] lg:-mt-[200px]">
                                                <Button variant="outline" className="rounded-full w-[70px] h-[70px] border-black/60 border lg:-ml-[62px] mb-[64px]">
                                                    <ImageDown strokeWidth={1} size={32} />
                                                </Button>
                                            </div>}

                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Choose Avatar</DrawerTitle>
                                            <DrawerDescription>Note: This will be the picture of the employee.</DrawerDescription>

                                            {imageUrl.length ? <>
                                            </> : <UploadDropzone
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
                                        </DrawerHeader>
                                        <DrawerFooter>
                                            <DrawerClose>
                                                <div className="flex flex-col gap-3 w-full items-center justify-center">
                                                    <Button variant="newGreen" className="w-[320px]">Done</Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-[320px]"
                                                        onClick={() => {
                                                            setImageUrl("")
                                                        }}>Cancel</Button>
                                                </div>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>




                                <div className="flex flex-row justify-center items-center w-full gap-7">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Firstname" {...field} type='text' className="w-[250px]" />
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
                                                    <Input placeholder="Lastname" {...field} type='text' className="w-[250px]" />
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
                                                    <Input placeholder="Contact" {...field} type='number' className="w-[250px]" />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="w-[250px]">
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email Address" {...field} type='email' />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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

                                <FormField
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
                                />
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        className="bg-[#B84AEB] hover:bg-[#3d1a4e8f] w-full"
                                        isLoading={isLoading}
                                        disabled={isLoading || imageIsEmpty}
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

export default page