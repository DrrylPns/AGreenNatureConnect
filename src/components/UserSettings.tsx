"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import useSettingsModal from '@/lib/hooks/useSettingsModal'
import { User } from '@prisma/client'
import React from 'react'
import { AccountSettings } from './settings/AccountSettings'

interface UserSettingsProps {
    user: User
}

export const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
    const { isOpen, onClose, } = useSettingsModal()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none'>
                <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription>
                        <AccountSettings />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
