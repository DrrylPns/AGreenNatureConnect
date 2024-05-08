"use client"

import { Button, buttonVariants } from '@/app/components/Ui/Button';
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
import { RadioGroup, RadioGroupItem } from '@/app/components/Ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/Ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from '@/lib/utils';
import { CreateEmployeeSchema, CreateEmployeeType } from "@/lib/validations/admin/createEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import axios, { AxiosError } from "axios";
import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";

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
      specialization,
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
        specialization,
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
      specialization: values.specialization,
    }
    createEmployee(payload)
  }

  return (
    <div className="w-full flex justify-center items-center bg-[#E3E1E1] mt-5 pb-5">
      <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center lg:p-11 lg:w-[740px] w-full rounded-3xl">
        <Card className="lg:w-[570px] w-full">
          <div className="w-full h-full">
            <div className="w-full flex justify-center items-center">
              <h1 className="font-bold text-lg mb-5">Staff Registration</h1>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <Drawer>
                  <DrawerTrigger asChild>
                    {imageUrl.length ?
                      <div className="w-full flex flex-row justify-between">
                        <div className='w-[100px] h-[100px]'>
                          <Image
                            src={imageUrl}
                            alt="productImage"
                            className="w-auto h-auto"
                            width={100}
                            height={100}
                          // onClick={() => {
                          //     setImageUrl("")
                          // }}
                          />
                        </div>

                        <div
                          className={cn(buttonVariants({
                            variant: "outline"
                          }), "cursor-pointer")}
                          onClick={() => {
                            setImageUrl("")
                          }}
                        >
                          Change
                        </div>
                      </div>

                      : <div className="w-fit">
                        <div className="cursor-pointer">
                          <p className='text-sm font-semibold mb-2'>Add Staff Photo</p>
                          <ImageDown strokeWidth={1} size={32} />
                        </div>
                      </div>}
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Choose Avatar</DrawerTitle>
                      <DrawerDescription>Note: This will be the picture of the farmer.</DrawerDescription>

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




                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Firstname"
                            {...field}
                            type="text"
                            className="w-full"
                            onKeyPress={(event) => {
                              const charCode = event.which ? event.which : event.keyCode;
                              // Allow alphabetic characters (both uppercase and lowercase), backspace, tab, and space
                              if (
                                !(charCode >= 65 && charCode <= 90) && // Uppercase letters
                                !(charCode >= 97 && charCode <= 122) && // Lowercase letters
                                charCode !== 32 && // Space
                                charCode !== 8 && // Backspace
                                charCode !== 9 && // Tab
                                charCode !== 0 // Special characters
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />

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
                          <Input
                            placeholder="Lastname"
                            {...field}
                            type="text"
                            className="w-full"
                            onKeyPress={(event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32 &&
                                charCode !== 8 &&
                                charCode !== 9 &&
                                charCode !== 0
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact" {...field} type='number' className="w-full" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                  name="specialization"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Urban Staff Role:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="MarketHub" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Markethub
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Informational" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Information Section
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
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