"use client"
import { Button } from '@/app/components/Ui/Button';
import { Card, CardContent, CardFooter } from '@/app/components/Ui/Card';
import { Input } from '@/app/components/Ui/Input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { Label } from '@/app/components/Ui/label';
import { Textarea } from '@/app/components/Ui/textarea';
import { toast } from '@/lib/hooks/use-toast';
import { UploadDropzone } from '@/lib/uploadthing';
import { CreateMaterialSchema, CreateMaterialType } from '@/lib/validations/employee/materials';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const page = () => {
    const [pdfUrl, setPdfUrl] = useState<string>("")
    const router = useRouter()

    const pdfUrlIsEmpty = pdfUrl.length === 0

    const form = useForm<CreateMaterialType>({
        resolver: zodResolver(CreateMaterialSchema),
    })

    const { mutate: createMaterial, isLoading } = useMutation({
        mutationFn: async ({
            description,
            title,
            material
        }: CreateMaterialType) => {
            const payload: CreateMaterialType = {
                description,
                title,
                material
            }

            const { data } = await axios.post("/api/employee/createMaterial", payload) // TODO API LOGIC
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
                router.push("/employee")
                router.refresh()
            }, 1000)
        }
    })

    const onSubmit = (values: CreateMaterialType) => {
        const payload: CreateMaterialType = {
            description: values.description,
            title: values.title,
            material: pdfUrl,
        }

        createMaterial(payload)
    }

    return (
        <div className="w-full flex justify-center items-center bg-[#E3E1E1]">
            <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center p-11 lg:w-[740px] rounded-3xl">
                <Card className="lg:w-[570px] p-11">
                    <div className="w-full h-full">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="font-bold text-lg mb-5">Learning Materials</h1>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Title" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is the learning materials title.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description"
                                                    {...field}
                                                    className='resize-none'
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This will serve as supporting description for the learning materials.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex justify-between'>
                                    <div>
                                        <FormLabel>PDF Material</FormLabel>
                                    </div>
                                    {pdfUrl && (
                                        <div>
                                            <Button
                                                onClick={() => setPdfUrl("")}
                                                variant={"newGreen"}
                                            >
                                                Change PDF
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {pdfUrl ? (
                                    <div className='flex justify-center items-center w-full border h-[190px] rounded-md'>
                                        <a target='_blank' href={pdfUrl}>
                                            <FileText className='ml-5' />
                                            <p>View PDF</p>
                                        </a>
                                    </div>
                                ) :
                                    (
                                        <>
                                            <UploadDropzone
                                                endpoint='pdfUploader'
                                                onClientUploadComplete={(res) => {
                                                    console.log("Files:", res)
                                                    if (res && res.length > 0 && res[0].url) {
                                                        setPdfUrl(res[0].url);
                                                    } else {
                                                        console.error('Please input a valid product image.', res);
                                                    }
                                                }}
                                                onUploadError={(error) => {
                                                    console.error(error.message)
                                                }}
                                            />
                                        </>
                                    )}

                                <FormDescription>Note: Only PDFs are allowed.</FormDescription>

                                <CardFooter>
                                    <Button type="submit" variant={"newGreen"} disabled={isLoading || pdfUrlIsEmpty} isLoading={isLoading}>Submit</Button>
                                </CardFooter>
                            </form>
                        </Form>

                    </div>
                </Card>
            </section>
        </div>
    )
}

export default page