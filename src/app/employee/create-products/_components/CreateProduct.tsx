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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/Ui/alert-dialog"
import { Input } from '@/app/components/Ui/Input'
import { Button } from '@/app/components/Ui/Button'
import { User } from '@prisma/client'
import { CreateProductSchema, CreateProductType } from '@/lib/validations/employee/products'
import ImageUpload from '@/app/components/image-upload'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, MinusCircle, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CreateProduct = () => { 
    const [imageUrl, setImageUrl] = useState<string>('')
    const [formStep, setFormStep] = useState(0)
    // const [perMeasurementSlots, setPerMeasurementSlots] = useState([{ measurement: 0, price: 0, estPieces: '' }]);
    const [prodName, setProdName] = useState<string>("")
    // const [typeMeasurementProd, setTypeMeasurementProd] = useState<string>("")
    const [quantityProd, setQuantityProd] = useState<number>()
    const [perKilogram, setPerKilogram] = useState<number>()
    const [harvestedFrom, setHarvestedFrom] = useState<string>()
    const [category, setCategory] = useState<string>()
    const router = useRouter()

    const imageIsEmpty = imageUrl.length === 0

    const form = useForm<CreateProductType>({
        resolver: zodResolver(CreateProductSchema),
    })

    const { formState } = form

    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: async ({
            productImage,
            name,
            category,
            quantity,
            priceInKg,
            harvestedFrom,
        }: CreateProductType) => {
            const payload: CreateProductType = {
                productImage,
                category,
                name,
                quantity,
                priceInKg,
                harvestedFrom,
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
            router.push("/employee/inventory")
        }
    })

    function onSubmit(values: CreateProductType) {
        const payload: CreateProductType = {
            productImage: imageUrl,
            category: values.category,
            name: values.name,
            quantity: values.quantity,
            priceInKg: values.priceInKg,
            harvestedFrom: values.harvestedFrom
        }

        createProduct(payload)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full bg-[#24643B] p-[24px] rounded-lg">
                {/* <ImageUpload /> */}

                {/* STEP 1 */}
                <div className={
                    cn('space-y-3', {
                        'hidden': formStep == 1
                    })
                }>
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
                                    {/* <Input placeholder={`${product.id}`} {...field} /> */}
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*  Quantity */}
                    {/* <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#f7d126]'>Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter value" {...field} type='number' className='rounded-full' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#f7d126]'>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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


                {/* STEP 2 */}
                <div className={
                    cn('h-full', {
                        'hidden': formStep == 0
                    })
                }>

                    {/* Per Kilo */}
                    {/* <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-[#f7d126] font-bold'>Per Kilogram</h1>
                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
                            onClick={() => setPerKiloSlots([...perKiloSlots, { price: '', estPieces: '' }])}
                        >
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className=''>Add Slot</h1>
                        </div>
                    </div>
                    {perKiloSlots.map((slot, index) => (
                        <div key={`perKilo-${index}-price`} className="flex justify-evenly items-center gap-3 mb-3 ">
                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].kilo` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Kilo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter kilo" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].price` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter price" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perKilo[${index}].estPieces` as any}

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Est.Pieces</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Estimated Pieces" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-[#f7d126] font-bold'>Per Pack</h1>

                        <div className='flex text-[#f7d126] font-bold items-center cursor-pointer'
                            onClick={() => setPerPackSlots([...perPackSlots, { price: '', estPieces: '' }])}
                        >
                            <Plus className='w-4 h-4 mr-1' strokeWidth={3} />
                            <h1 className=''>Add Slot</h1>
                        </div>
                    </div>
                    {perPackSlots.map((slot, index) => (
                        <div key={`perPack-${index}-price`} className="flex justify-between items-center gap-3 mb-3 ">
                            <FormField
                                control={form.control}
                                name={`perPack[${index}].pack` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Pack</FormLabel>
                                        <FormControl>

                                            <Input placeholder="Enter pack" {...field} className="w-50% rounded-full" type='number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perPack[${index}].price` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Price</FormLabel>
                                        <FormControl>

                                            <Input placeholder="Enter price" {...field} className="w-50% rounded-full" type='number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`perPack[${index}].estPieces` as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#f7d126]">Est.Pieces</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Estimated Pieces" {...field} className="w-50% rounded-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))} */}


                    {/* NEW DRAFT */}
                    <h1 className='text-[#f7d126] mb-5 font-bold'>
                        Add stocks to {prodName}
                    </h1>
                    <div className='flex flex-row items-center justify-center w-full gap-11 space-x-3 mb-11'>
                        <FormField
                            control={form.control}
                            name="priceInKg"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='text-[#f7d126]'>Price per Kilograms(kg)</FormLabel>
                                <FormControl>
                                    <Input placeholder="100" {...field} type='number' className='rounded-full' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#f7d126]'>Total Number of Stocks</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} type='number' className='rounded-full' />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row items-center justify-center w-full gap-11 space-x-3 mb-11'>
                        <FormField
                            control={form.control}
                            name="harvestedFrom"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='text-[#f7d126]'>Harvested from</FormLabel>
                                <FormControl>
                                    <Input placeholder="Farm name" {...field} type='text' className='rounded-full' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* <div className='flex items-center w-full'> */}

                <div className="flex gap-2 justify-end w-full mt-7">
                    <Button
                        type='button'
                        disabled={imageIsEmpty}
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
                            if (!nameState.isDirty || nameState.invalid) return;
                            // if (!quantityState.isDirty || quantityState.invalid) return;
                            if (!categoryState.isDirty || categoryState.invalid) return;
                            setProdName(form.getValues("name") as string)
                            setCategory(form.getValues("category") as string)
                            setFormStep(1)
                        }}
                    >
                        Next Step <ArrowRight className='w-4 h-4 ml-2 font-bold' />
                    </Button>

                    <Button
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
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger
                            className={
                                cn('bg-[#099073] text-zinc-100 hover:bg-[#099073]/80 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 px-10 py-3', {
                                    'hidden': formStep == 0
                                })
                            }
                            onClick={() => {
                                setQuantityProd(form.getValues("quantity"))
                                setPerKilogram(form.getValues("priceInKg"))
                                setHarvestedFrom(form.getValues("harvestedFrom"))
                                // console.log("GEY" + perMeasurementValues)
                            }}
                            disabled={
                                imageIsEmpty || isLoading || !formState.isValid || !formState.dirtyFields
                            }
                        >Save</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to add stock/s?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <div className='flex flex-col justify-between mt-2'>
                                        <div>
                                            Product Name:
                                            <span className='font-bold text-black ml-1'>
                                                {prodName}
                                            </span>
                                        </div>
                                        <div>
                                            Category:
                                            <span className='font-bold text-black ml-1'>
                                                {category}
                                            </span>
                                        </div>
                                        <div>
                                            Price in Kilogram(Kg):
                                            <span className='font-bold text-black ml-1'>
                                                {perKilogram}
                                            </span>
                                        </div>
                                        <div>
                                            Total Number of Stocks(Kg):
                                            <span className='font-bold text-black ml-1'>
                                                {quantityProd}
                                            </span>
                                        </div>
                                        <div>
                                            Harvested from:
                                            <span className='font-bold text-black ml-1'>
                                                {harvestedFrom}
                                            </span>
                                        </div>
                                    </div>

                                    {/* <div className='flex flex-col w-full mt-3 mb-1'>
                                        <div className='flex justify-between font-bold text-black mb-2'>
                                            <div className='flex-none w-1/3'>
                                                Variants
                                            </div>
                                            <div className='flex-none w-1/3'>
                                                Price in Pesos
                                            </div>
                                            <div className='flex-none w-1/3'>
                                                Est. Piece/s
                                            </div>
                                        </div>

                                        {perMeasurementValues.map((slot, index) => (
                                            <div key={index} className="flex flex-row justify-between mb-2">
                                                {slot.measurement > 0 && (
                                                    <div>
                                                        <span className="font-bold text-black ml-1">{slot.measurement as number}</span>
                                                    </div>
                                                )}
                                                {slot.price > 0 && (
                                                    <div>
                                                        <span className="font-bold text-black ml-1">{slot.price as number}</span>
                                                    </div>
                                                )}
                                                {slot.estPieces && (
                                                    <div>
                                                        <span className="font-bold text-black ml-1">{slot.estPieces as string}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div> */}

                                  

                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-[#099073] hover:bg-[#099073]/80'>Cancel</AlertDialogCancel>
                                <Button
                                    type="submit"
                                    variant="newGreen"
                                    className={
                                        cn('bg-[#099073] hover:bg-[#099073]/80', {
                                            'hidden': formStep == 0
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
                    {/* <Button
                        type="submit"
                        variant="newGreen"
                        className={
                            cn('bg-[#099073] hover:bg-[#099073]/80', {
                                'hidden': formStep == 0
                            })
                        }
                        isLoading={isLoading}
                        disabled={imageIsEmpty || isLoading}
                    // onClick={() => {
                    //     form.handleSubmit(onSubmit)
                    // }}
                    >
                        Continue
                    </Button> */}
                    {/* <Button
                        type="submit"
                        variant="newGreen"
                        className={
                            cn('bg-[#D9D9D9] text-[#24643B]', {
                                'hidden': formStep == 0
                            })
                        }
                        isLoading={isLoading}
                        disabled={imageIsEmpty || isLoading}
                    >
                        Save</Button> */}
                </div>
                {/* </div> */}

            </form >
        </Form >
    )
}

export default CreateProduct