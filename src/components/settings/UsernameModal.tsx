"use client"
import { Button } from "@/app/components/Ui/Button"
import { Input } from "@/app/components/Ui/Input"
import {
    Form,
    FormControl,
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
import useUsernameModal from "@/lib/hooks/useUsernameModal"
import { ChangeUsernameSchema, ChangeUsernameType } from "@/lib/validations/changeUserProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from '@prisma/client'
import { useTransition } from 'react'
import { useForm } from "react-hook-form"
import { changeUsername } from "../../../actions/settings"

interface ProfileModalProps {
    user: User
}

export const UsernameModal: React.FC<ProfileModalProps> = ({ user }) => {
    const [isPending, startTransition] = useTransition()
    const { isOpen, onClose } = useUsernameModal()

    const form = useForm<ChangeUsernameType>({
        resolver: zodResolver(ChangeUsernameSchema),
        defaultValues: {
            newUsername: user.username || ""
        }
    })

    const onSubmit = (values: ChangeUsernameType) => {

        startTransition(() => {
            changeUsername(values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            description: data.error,
                            variant: "destructive",
                        })
                    }

                    if (data?.success) {
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
                        <div className='text-black dark:text-white font-medium mb-6'>Change your profile information</div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="newUsername"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="John Doe"
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
