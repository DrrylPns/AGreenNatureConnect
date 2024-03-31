"use client"
import { Button } from "@/app/components/Ui/Button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/components/Ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import useGenderModal from '@/lib/hooks/useGenderModal'
import { User } from '@prisma/client'
import React, { useState, useTransition } from 'react'
import { changeGender } from "../../../actions/settings"
import { toast } from "@/lib/hooks/use-toast"

interface GenderModalProps {
    user: User
}

export const GenderModal: React.FC<GenderModalProps> = ({ user }) => {
    const [selectedGender, setSelectedGender] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const { isOpen, onClose } = useGenderModal()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none w-full'>
                <DialogHeader>
                    <DialogDescription>
                        <div className='text-black dark:text-white font-medium mb-6'>Choose your gender</div>
                        <Select value={selectedGender} onValueChange={setSelectedGender}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Genders</SelectLabel>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="w-full flex justify-end items-end mt-3">
                            <Button
                                variant="newGreen"
                                disabled={isPending}
                                onClick={() => {
                                    startTransition(() => {
                                        changeGender(selectedGender).then((callback) => {
                                            if (callback.error) {
                                                toast({
                                                    description: callback.error,
                                                    variant: "destructive"
                                                })
                                            }

                                            if (callback.success) {
                                                toast({
                                                    description: callback.success
                                                })
                                                onClose()
                                            }
                                        })
                                    })
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
