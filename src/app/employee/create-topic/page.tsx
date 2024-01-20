"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/lib/hooks/use-toast";
import axios, { AxiosError } from "axios"
import { CreateTopicType, TopicSchema } from "@/lib/validations/topicPostScema";
import { Separator } from "@/app/components/Ui/Separator";
import { Input } from "@/app/components/Ui/Input";
import { Button } from "@/app/components/Ui/Button";
import { useMutation } from "@tanstack/react-query";
import useLoginModal from "@/lib/hooks/useLoginModal";

const page = () => {
    const [topic, setTopic] = useState<string>('')
    const router = useRouter()
    const loginModal = useLoginModal()

    const isDisabled = () => {
        if (topic.length < 2) {
            return true
        }
    }

    const { mutate: createTopic, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: CreateTopicType = {
                topicName: topic
            }
            const { data } = await axios.post('/api/employee/createTopic', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: "Topic already exists",
                        description: "Please choose a different topic",
                        variant: 'destructive',
                    })
                }

                if (err.response?.status === 422) {
                    return toast({
                        title: "Invalid topic creation!",
                        description: "Please choose a name between 2 and 20 characters",
                        variant: 'destructive',
                    })
                }

                if (err.response?.status === 401) {
                    return (<>
                        {loginModal.onOpen()}
                        {toast({
                            title: "Invalid user",
                            description: "Only authorized users can do this action!",
                            variant: 'destructive',
                        })}
                    </>)
                    // for now loginModal muna ng user TO CHANGE
                }
            }
            // finally
            toast({
                title: "There was an error.",
                description: "Could not process topic creation!",
                variant: 'destructive',
            })
        },
        onSuccess: (data) => {
            // router.push(`/discussion/${data}`)
            toast({
                title: "Success!",
                description: `The ${data} topic was successfully created!`,
                variant: 'default',
            })
            // this is a dynamic page routing for the generated topic TODO / IMPLEMENT kumbaga ma reredirect si employee don sa ginawa niyang topic tas mkikita don mga posts, etc. pag uusapan pa to not final idea lng
        }
    })

    return (
        <div className="w-full mx-auto px-[32px] flex items-center h-full max-w-3xl">
            <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
                <h1 className="text-2xl font-bold text-neutral-500">Create A Topic</h1>
                <Separator />

                <div>
                    <p className="text-lg font-medium">Topic</p>
                    <p className="text-xs pb-2 text-zinc-400">Topic must be atleast 2 characters long.</p>

                    <div className="relative">
                        <Input
                            id="topicName"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="pl-6"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-3">
                        <Button variant='subtle' onClick={() => router.back()}>Cancel</Button>
                        <Button
                            variant='newGreen'
                            isLoading={isLoading}
                            disabled={isDisabled()}
                            onClick={() => createTopic()}>
                            Create Topic
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page