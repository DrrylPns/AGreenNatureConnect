"use client"
import { Button } from "@/app/components/Ui/Button"
import { Input } from "@/app/components/Ui/Input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/app/components/Ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import { toast } from "@/lib/hooks/use-toast"
import useCommunitySettingsModal from "@/lib/hooks/useCommunitySettingsModal"
import { ChangeCommunitySettingsSchema, ChangeCommunitySettingsType } from "@/lib/validations/changeUserProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { Community, User } from '@prisma/client'
import { useTransition } from 'react'
import { useForm } from "react-hook-form"
import { changeCommunitySettings } from "../../../actions/community"

interface Props {
    user: User & {
        Community: Community
    }
}

export const CommunityModal: React.FC<Props> = ({ user }) => {
    const [isPending, startTransition] = useTransition()
    const { isOpen, onClose } = useCommunitySettingsModal()

    const form = useForm<ChangeCommunitySettingsType>({
        resolver: zodResolver(ChangeCommunitySettingsSchema),
        defaultValues: {
            newPhone: user?.Community.contactNumber || "",
        }
    })

    const onSubmit = (values: ChangeCommunitySettingsType) => {

        startTransition(() => {
            changeCommunitySettings(values)
                .then((data) => {
                    if (data.error) {
                        toast({
                            description: data.error,
                            variant: "destructive",
                        })
                    }

                    if (data.success) {
                        toast({
                            description: data.success
                        })
                        onClose()
                    }
                });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none w-full'>
                <DialogHeader>
                    <DialogDescription>
                        <div className='text-black dark:text-white font-medium mb-6'>Change your community settings</div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="newPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="09****"
                                                        type="number"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Note: This number will serve as your GCash Number in the markethub's transaction
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* <FormField
                                        control={form.control}
                                        name="newBirthday"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of birth</FormLabel>
                                                <div className="w-full border border-gray-300 p-2 rounded-md">
                                                    <input
                                                        id='newBirthday'
                                                        type="date"
                                                        className="w-full"
                                                        disabled={isPending}
                                                        //@ts-ignore
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        // {...register("newBirthday")}
                                                        max={getMinBirthDate()}
                                                    />
                                                </div>
                                                <FormDescription>
                                                    Your date of birth is used to calculate your age.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="newAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Address"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}

                                    <div className="w-full flex justify-end items-end mt-3">
                                        <Button
                                            variant="newGreen"
                                            disabled={isPending}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>


                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}
