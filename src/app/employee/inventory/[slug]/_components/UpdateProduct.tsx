"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notFound, useRouter } from 'next/navigation'
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
import { Product, Variant } from '@prisma/client'
import { UpdateProductSchema, UpdateProductType } from '@/lib/validations/employee/products'
import { toast } from '@/lib/hooks/use-toast'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { ArrowLeft, ArrowRight, MinusCircle, Plus } from 'lucide-react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/Ui/alert-dialog'

interface UpdateProductProps {
  product: Product & {
    variants: Variant[];
  } | null
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {

  const [imageUrl, setImageUrl] = useState<string>(product?.productImage as string)
  const [formStep, setFormStep] = useState(0)
  const [perMeasurementSlots, setPerMeasurementSlots] = useState([{ measurement: 0, price: 0, estPieces: '' }]);
  const [prodName, setProdName] = useState<string>("")
  const [typeMeasurementProd, setTypeMeasurementProd] = useState<string>("")
  const [quantityProd, setQuantityProd] = useState<number>()
  const router = useRouter()

  const imageIsEmpty = imageUrl.length === 0

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name,
      category: product?.category,
      // perMeasurement: product?.variants.map((variant) => ({
      //   measurement: variant.variant,
      //   price: variant.price,
      //   estPieces: variant.EstimatedPieces.toString(),
      // })) || [],
      // quantity: ,
      // typeOfMeasurement: product?.variants[0]?.unitOfMeasurement,
    }
  })

  // console.log(product?.variants)

  const { formState } = form

  const removePerMeasurementSlot = (indexToRemove: any) => {
    setPerMeasurementSlots((prevSlots) => prevSlots.filter((_, index) => index !== indexToRemove));
  };

  const getPerMeasurementValues = () => {
    return perMeasurementSlots.map((slot, index) => ({
      //@ts-ignore
      measurement: form.getValues(`perMeasurement[${index}].measurement`),
      //@ts-ignore
      price: form.getValues(`perMeasurement[${index}].price`),
      //@ts-ignore
      estPieces: form.getValues(`perMeasurement[${index}].estPieces`),
    }));
  };

  const perMeasurementValues = getPerMeasurementValues();

  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: async ({
      id,
      name,
      category,
      // perMeasurement,
      productImage,
      // quantity,
      // typeOfMeasurement,
    }: UpdateProductType) => {
      const payload: UpdateProductType = {
        id: product?.id,
        name,
        category,
        // perMeasurement,
        productImage,
        // quantity,
        // typeOfMeasurement,
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
      // quantity: values.quantity,
      // typeOfMeasurement: values.typeOfMeasurement,
      // perMeasurement: values.perMeasurement,
    }

    // console.log(payload)
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        {/* <div className='flex items-center w-full'> */}

        <div className="flex gap-2 justify-end w-full mt-7">
          {/* <Button
            type='button'
            variant="ghost"
            className={
              cn('bg-transparent hover:bg-opacity-30 text-black font-bold', {
                'hidden': formStep == 1
              })
            }
            onClick={() => {
              form.trigger(['productImage', 'name', 'category'])

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
              // if (!nameState.isDirty || nameState.invalid) return;
              // if (!quantityState.isDirty || quantityState.invalid) return;
              // if (!categoryState.isDirty || categoryState.invalid) return;
              setProdName(form.getValues("name") as string)
              setFormStep(1)
            }}
          >
            Next Step <ArrowRight className='w-4 h-4 ml-2 font-bold' />
          </Button> */}

          {/* <Button
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
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger
              className={
                cn('bg-white text-black hover:bg-white/80 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 px-10 py-3', {

                })
              }
            // onClick={() => {
            //   setTypeMeasurementProd(form.getValues("typeOfMeasurement") as string)
            //   setQuantityProd(form.getValues("quantity"))

            //   // console.log("GEY" + perMeasurementValues)
            // }}
            // disabled={
            //   imageIsEmpty || isLoading || !formState.isValid || !formState.dirtyFields
            // }
            >Update</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update</AlertDialogTitle>
                <AlertDialogDescription>
                  Note: By clicking continue you agree to update the selected products.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='bg-[#099073] hover:bg-[#099073]/80'>Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  variant="newGreen"
                  className={
                    cn('bg-[#099073] hover:bg-[#099073]/80', {
                      // 'hidden': formStep == 0
                    })
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

// {/* <div className={
//           cn('h-full', {
//             'hidden': formStep == 0
//           })
//         }>

//           {/* NEW DRAFT */}
//           <h1 className='text-[#f7d126] mb-5 font-bold'>
//             Update stocks of {prodName}
//           </h1>
//           <div className='flex flex-row items-center justify-center w-full gap-11 space-x-3 mb-11'>
//             <FormField
//               control={form.control}
//               name="typeOfMeasurement"
//               render={({ field }) => (
//                 <FormItem className='w-[221px]'>
//                   <FormLabel className='text-[#f7d126]'>Unit of Measurement</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select" className='rounded-full' />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Kilograms">Kilograms</SelectItem>
//                       <SelectItem value="Grams">Grams</SelectItem>
//                       <SelectItem value="Pieces">Pieces</SelectItem>
//                       <SelectItem value="Pounds">Pounds (lbs)</SelectItem>
//                       <SelectItem value="Packs">Packs</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className='text-[#f7d126]'>Total Number of Stocks</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter value" {...field} type='number' className='rounded-full' />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className='h-[1px]' />

//           {perMeasurementSlots.map((slot, index) => (
//             <div key={`perMeasurement-${index}-price`} className="flex justify-evenly items-center gap-3 mb-3 w-full">
//               <FormField
//                 control={form.control}
//                 name={`perMeasurement[${index}].measurement` as any}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#f7d126]">Variants</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter Measurement"
//                         {...field}
//                         className="rounded-full"
//                         type='number'
//                       // onChange={(e) => handleMeasurementChange(index, e.target.value)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`perMeasurement[${index}].price` as any}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#f7d126]">Price in Pesos</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter price"
//                         {...field}
//                         className="rounded-full"
//                         type='number'
//                       // onChange={(e) => handlePriceChange(index, e.target.value)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`perMeasurement[${index}].estPieces` as any}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[#f7d126]">Est. piece/s</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter Estimated Pieces"
//                         {...field}
//                         className="rounded-full"
//                       // onChange={(e) => handleEstPiecesChange(index, e.target.value)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* {index > 0 && ( */}
//               <div className="flex items-center justify-center cursor-pointer"
//                 onClick={() => index > 0 && removePerMeasurementSlot(index)}
//               >
//                 <MinusCircle
//                   className="w-4 h-4 text-red-500 cursor-pointer flex items-center justify-center mt-9"
//                   strokeWidth={3}
//                 // onClick={() => removePerMeasurementSlot(index)}
//                 />
//                 {/* <h1 className='mt-1 ml-1 text-red-500 cursor-pointer' onClick={() => removePerMeasurementSlot(index)}>Remove Slot</h1> */}
//               </div>
//               {/* )} */}
//             </div>
//           ))}

//           <div className='flex flex-row justify-start items-center w-full'>
//             <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
//               onClick={() => setPerMeasurementSlots([...perMeasurementSlots, { measurement: 0, price: 0, estPieces: '' }])}
//             >
//               <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
//               <h1 className='mt-1'>Add Slot</h1>
//             </div>
//           </div>
//         </div> */}