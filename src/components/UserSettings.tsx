"use client"
import { TabSettings, TabSettingsContent, TabSettingsList, TabSettingsTrigger, } from "@/components/ui/TabSettings"
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
import { ProfileSettings } from "./settings/ProfileSettings"

interface UserSettingsProps {
    user: User
}

export const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
    const { isOpen, onClose, } = useSettingsModal()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='rounded-none w-full'>
                <DialogHeader>
                    <TabSettings defaultValue="account" className="w-full">
                        <DialogTitle>
                            <TabSettingsList>
                                <TabSettingsTrigger value="account">Account</TabSettingsTrigger>
                                <TabSettingsTrigger value="profile">Profile</TabSettingsTrigger>
                            </TabSettingsList>
                        </DialogTitle>
                        <DialogDescription className="mt-6">
                            <TabSettingsContent value="account">
                                <AccountSettings user={user} />
                            </TabSettingsContent>

                            <TabSettingsContent value="profile">
                                <ProfileSettings user={user} />
                            </TabSettingsContent>
                        </DialogDescription>
                    </TabSettings>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
