'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/lib/hooks/use-toast'

import { Button } from '@/app/components/Ui/Button'
import { Input } from '@/app/components/Ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { Textarea } from '@/app/components/Ui/textarea'
import { AddReviewType, ReviewSchema } from '@/lib/validations/addReviewSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { OrderedVariant } from './Orders'
import { RatingStars } from './Rating'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'


function ReviewModal({
    orderedVariant,
    transactionId
}: {
    orderedVariant: OrderedVariant[]
    transactionId: string,
}) {
    const form = useForm<AddReviewType>({
        resolver: zodResolver(ReviewSchema),
    })

    console.log(transactionId)
    
    const router = useRouter()

    const [imageUrl, setImageUrl] = useState<string>('')

    const imageIsEmpty = imageUrl.length === 0

    const { mutate: addReview, isLoading } = useMutation({
        mutationFn: async ({
            image,
            priceRating,
            qualityRating,
            serviceRating,
            freshnessRating,
            overAllRating,
            title,
            description,
            productId,
            transactionId
        }: AddReviewType) => {
            const payload: AddReviewType = {
                image,
                priceRating,
                qualityRating,
                serviceRating,
                freshnessRating,
                overAllRating,
                title,
                description,
                productId,
                transactionId,
            }

            const { data } = await axios.post("/api/markethub/add-review", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    toast({
                        title: 'Error',
                        description: "Bad Request!",
                        variant: 'destructive',
                    })
                }
                if (err.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: "Unauthorized!",
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
            console.log(data)
            toast({
                title: 'Success!',
                description: `${data}`,
                variant: 'default',
            })

        }
    })

    function onSubmit(data: z.infer<typeof ReviewSchema>) {
        const payload: AddReviewType = {
            image: imageUrl,
            priceRating: data.priceRating,
            qualityRating: data.qualityRating,
            serviceRating: data.serviceRating,
            freshnessRating: data.freshnessRating,
            overAllRating: data.overAllRating,
            title: data.title,
            description: data.description,
            productId: data.productId,
            transactionId: transactionId
        }
        addReview(payload)
        console.log(payload)

    }
    return (
        <div className={`flex gap-3`}>
            <Dialog>
                <DialogTrigger>
                    <div
                        className=''
                    >
                        Add Review
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className='flex flex-col items-start gap-1'>
                        <DialogTitle className='flex items-center'><Star size={40} color='#F7C35F' fill='#F7C35F' className='mr-5' /> SUBMIT YOUR REVIEW</DialogTitle>

                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

                            <FormField
                                control={form.control}
                                name="productId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select a product to review</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className=' border-gray-400 border'>
                                                    <SelectValue placeholder="Product Name" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {orderedVariant && orderedVariant.map((variant) => (
                                                    <SelectItem key={variant.id} value={variant.product.id}>{variant.product.name}</SelectItem>
                                                ))}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-col items-center justify-around border border-black w-full'>
                                <h1 className='text-lg font-semibold'>Rate and review your experience:</h1>
                                <div className=''>
                                    <FormField
                                        control={form.control}
                                        name="priceRating"
                                        render={({ field }) => (
                                            <FormItem >
                                                <div className='flex items-center '>
                                                    <h1 className='w-24'>Price : </h1>
                                                    <div className=''>
                                                        <RatingStars width={150} readonly={false} onChange={field.onChange} average={field.value} />
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="qualityRating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center '>
                                                    <h1 className='w-24'>Quality : </h1>
                                                    <div className=''>
                                                        <RatingStars width={150} readonly={false} onChange={field.onChange} average={field.value} />
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="serviceRating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center '>
                                                    <h1 className='w-24'>Service : </h1>
                                                    <div className=''>
                                                        <RatingStars width={150} readonly={false} onChange={field.onChange} average={field.value} />
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="freshnessRating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center '>
                                                    <h1 className='w-24'>Freshness : </h1>
                                                    <div className=''>
                                                        <RatingStars width={150} readonly={false} onChange={field.onChange} average={field.value} />
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="overAllRating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center '>
                                                    <h1 className='w-24'>Overall : </h1>
                                                    <div className=''>
                                                        <RatingStars width={150} readonly={false} onChange={field.onChange} average={field.value} />
                                                    </div>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Review Summary</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your feedback Summary" {...field} type='text' className="w-full border-gray-400 border" />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback or Suggestion</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Explain your feedback here..."
                                                className="resize-none w-full border-gray-400 border"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex justify-between'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="bg-lime-600 hover:bg-lime-600/80"
                                        >
                                            Upload Photo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        {imageUrl.length ? <div className="w-full flex flex-col items-center justify-center mt-5">
                                            <Image
                                                alt='product image'
                                                src={imageUrl}
                                                width={250}
                                                height={250}
                                                className='mb-3'
                                            />
                                            <Button variant="outline" onClick={() => setImageUrl("")}>Change</Button>
                                        </div> : <UploadDropzone
                                            className="text-green"
                                            appearance={{
                                                button: "bg-[#00B207] p-2 mb-3",
                                                label: "text-green",
                                                allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-green",
                                            }}
                                            endpoint="changeAvatar"
                                            onClientUploadComplete={(res) => {
                                                console.log('Files: ', res);
                                                if (res && res.length > 0 && res[0].url) {
                                                    setImageUrl(res[0].url);
                                                } else {
                                                    console.error('Please input a valid image.', res);
                                                }
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast({
                                                    title: 'Error!',
                                                    description: error.message,
                                                    variant: 'destructive',
                                                })
                                            }}
                                        />
                                        }
                                    </DialogContent>
                                </Dialog>
                                {/* Other form fields go here */}
                                <Button type="submit" className='bg-lime-600 hover:bg-lime-600/80' isLoading={isLoading}>Submit</Button>
                            </div>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReviewModal