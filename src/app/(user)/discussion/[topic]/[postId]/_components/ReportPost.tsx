"use client"
import { AiOutlineEdit } from 'react-icons/ai'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/Ui/Dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReportSchema, ReportType } from '@/lib/validations/reportSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { RadioGroup, RadioGroupItem } from '@/app/components/Ui/radio-group';
import { Button } from '@/app/components/Ui/Button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/lib/hooks/use-toast';
import { Post } from '@prisma/client';

//need to fetch poster and postId
interface ReportPost {
    post: Post
}

export const ReportPost = ({ post }: ReportPost) => {

    const form = useForm<ReportType>({
        resolver: zodResolver(ReportSchema),
    })

    const { mutate: handleReport, isLoading } = useMutation({
        mutationFn: async ({ type, postId, posterId }: ReportType) => {
            const payload: ReportType = {
                posterId,
                postId,
                type,
            }

            const { data } = await axios.post("/api/user/reportUser", payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    toast({
                        description: "No user found!",
                        variant: 'destructive',
                    })
                }
                if (err.response?.status === 400) {
                    toast({
                        description: "You have already reported this post!",
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
                description: `User has been reported!`,
                variant: 'default',
            })

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    })

    function onSubmit(values: ReportType) {
        const payload: ReportType = {
            posterId: post.authorId,
            postId: post.id,
            type: values.type,
        }

        handleReport(payload)
    }

    return (
        <div className='w-full items-center justify-center'>
            <Dialog>
                <DialogTrigger>
                    <div className='flex flex-row items-center'>
                        <div className='mr-2'>
                            <AiOutlineEdit />
                        </div>
                        <div>
                            Report
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className='flex flex-col items-start gap-1'>
                        <DialogTitle>Why are you reporting this user?</DialogTitle>
                        <DialogDescription className="w-full">
                            Please provide a reason for reporting. This will help us improve our service.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className='font-bold'>Reason</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="IntellectualProperty" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Intellectual Property
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="FraudOrScam" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Fraud or Scam
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="MockingVictims" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Mocking Victims
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Bullying" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Bullying
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="ChildAbuse" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Child Abuse
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="AnimalAbuse" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Animal Abuse
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SexualActivity" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Sexual Activity
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SuicideOrSelfInjury" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Suicide or Self-Injury
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="HateSpeech" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Hate Speech
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="PromotingDrugUse" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Promoting drug use
                                                    </FormLabel>
                                                </FormItem>
                                                {/*  */}
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="NonConsensualIntimateImages" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Non-consensual intimate images
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SexualExploitation" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Sexual Exploitation
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Harassment" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Harassment
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="UnauthorizedSales" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Unauthorized Sales
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Violence" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Violence
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SharingPrivateImages" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Sharing private images
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="IrrelevantContent" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Irrelevant Content
                                                    </FormLabel>
                                                </FormItem>

                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='bg-lime-600 hover:bg-lime-600/80' isLoading={isLoading}>Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>

    )
}
