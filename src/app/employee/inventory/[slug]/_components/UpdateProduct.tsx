"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, buttonVariants } from '@/app/components/Ui/Button'
import { Input } from '@/app/components/Ui/Input'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/Ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/components/Ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { toast } from '@/lib/hooks/use-toast'
import { UploadDropzone } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { UpdateProductSchema, UpdateProductType } from '@/lib/validations/employee/products'
import { Product, } from '@prisma/client'
import Image from 'next/image'

interface UpdateProductProps {
  product: Product & {
    
  } | null
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {

  const [imageUrl, setImageUrl] = useState<string>(product?.productImage as string)
  const [formStep, setFormStep] = useState(0)
  const router = useRouter()

  const imageIsEmpty = imageUrl.length === 0

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name,
      category: product?.category,
      priceInKg: product?.priceInKg,
      priceInPacks: product?.priceInPacks,
      priceInPieces: product?.priceInPieces,
    }
  })

  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: async ({
      id,
      name,
      category,
      productImage,
      priceInKg,
      priceInPacks,
      priceInPieces,
    }: UpdateProductType) => {
      const payload: UpdateProductType = {
        id: product?.id,
        name,
        category,
        productImage,
        priceInKg,
        priceInPacks,
        priceInPieces,
      }

      const { data } = await axios.put("/api/employee/products", payload)
      console.log(data)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast({
            title: "Error",
            description: "Unauthorized",
            variant: "destructive",
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
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      }

    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "You have updated the product!",
        variant: "default",
      })
      router.push("/employee/inventory")
    }
  })

  function onSubmit(values: UpdateProductType) {
    const payload: UpdateProductType = {
      id: product?.id,
      productImage: imageUrl,
      name: values.name,
      category: values.category,
      priceInKg: values.priceInKg,
      priceInPacks: values.priceInPacks,
      priceInPieces: values.priceInPieces,
    }

    updateProduct(payload)
  }


  return (

    // NEW DRAFT

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full bg-[#24643B] p-[24px] rounded-lg">
        {/* <ImageUpload /> */}

        {/* STEP 1 */}
        <div className={
          cn('space-y-3', {
            'hidden': formStep == 1
          })
        }>

          <div className='hidden'><FormField
            control={form.control}
            name="id"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item No.</FormLabel>
                <FormControl>
                  <Input placeholder="id" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /></div>

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
                width={100}
                height={100}
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
                  form.setValue("productImage", res[0].url)
                } else {
                  console.error('Please input a valid product image.', res);

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
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-x-5'>
            <FormField
              control={form.control}
              name="priceInKg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#f7d126]'>Price In Kilograms</FormLabel>
                  <FormControl>
                    <Input placeholder="₱" type='number' {...field} className='rounded-full' />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceInPacks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#f7d126]'>Price In Packs</FormLabel>
                  <FormControl>
                    <Input placeholder="₱" type='number' {...field} className='rounded-full' />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceInPieces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#f7d126]'>Price In Pieces</FormLabel>
                  <FormControl>
                    <Input placeholder="₱" type='number' {...field} className='rounded-full' />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
         

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[#f7d126]'>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" className='rounded-full' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 justify-end w-full mt-7">
          <AlertDialog>
            <AlertDialogTrigger
              className={
                cn('bg-white text-black hover:bg-white/80 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 px-10 py-3', {

                })
              }
            >Update</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update</AlertDialogTitle>
                <AlertDialogDescription>
                  Note: By clicking continue you agree to update the selected products.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={buttonVariants({ variant: "outline" })}>Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  variant="newGreen"
                  className={
                    cn('bg-[#099073] hover:bg-[#099073]/80')
                  }
                  isLoading={isLoading}
                  disabled={imageIsEmpty || isLoading}
                  onClick={() => {
                    form.handleSubmit(onSubmit)()
                  }}
                >
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form >
    </Form >
  )
}