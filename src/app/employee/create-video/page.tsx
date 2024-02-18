"use client"
import { Button } from '@/app/components/Ui/Button';
import { Card, CardFooter } from '@/app/components/Ui/Card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog';
import { Input } from '@/app/components/Ui/Input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { Textarea } from '@/app/components/Ui/textarea';
import { toast } from '@/lib/hooks/use-toast';
import { UploadDropzone } from '@/lib/uploadthing';
import { CreateVideoSchema, CreateVideoType } from '@/lib/validations/employee/videos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player/lazy'

const page = () => {
    const [videoUrl, setVideoUrl] = useState<string>("")
    const router = useRouter()

    const form = useForm<CreateVideoType>({
        resolver: zodResolver(CreateVideoSchema),
    })

    const { mutate: createVideoTutorial, isLoading } = useMutation({
        mutationFn: async ({
            description,
            title,
            video,
        }: CreateVideoType) => {
            const payload: CreateVideoType = {
                description,
                title,
                video,
            }

            const { data } = await axios.post("/api/employee/createVideo", payload) // TODO API LOGIC
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

    const onSubmit = (values: CreateVideoType) => {
        const payload: CreateVideoType = {
            description: values.description,
            title: values.title,
            video: videoUrl,
        }

        createVideoTutorial(payload)
    }

    return (
        <div className="w-full flex justify-center items-center bg-[#E3E1E1]">
            <section className="bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] flex items-center justify-center p-11 lg:w-[740px] rounded-3xl">
                <Card className="lg:w-[570px] p-11">
                    <div className="w-full h-full">
                        <div className="w-full flex justify-center items-center">
                            <h1 className="font-bold text-lg mb-5">Video Tutorials</h1>
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
                                        <FormLabel>Video Tutorial</FormLabel>
                                    </div>
                                    {videoUrl && (
                                        <div>
                                            <Button
                                                onClick={() => setVideoUrl("")}
                                                variant={"newGreen"}
                                            >
                                                Change Video
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {videoUrl ? (
                                    <div className='flex justify-center items-center w-full border h-[190px] rounded-md'>
                                        <Dialog>
                                            <DialogTrigger className='flex flex-col items-center gap-2'><Video className='font-bold' />View Video</DialogTrigger>
                                            <DialogContent >
                                                <DialogHeader>
                                                    <DialogDescription>
                                                        <ReactPlayer url={videoUrl} controls light muted width={460} height={300} />
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ) :
                                    (
                                        <>
                                            <UploadDropzone
                                                endpoint='videoUploader'
                                                onClientUploadComplete={(res) => {
                                                    console.log("Files:", res)
                                                    if (res && res.length > 0 && res[0].url) {
                                                        setVideoUrl(res[0].url);
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

                                <CardFooter>
                                    <Button type="submit" variant={"newGreen"} disabled={isLoading}>Submit</Button>
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