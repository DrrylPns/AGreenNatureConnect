"use client"
import { Button } from '@/app/components/Ui/Button';
import { AlertTriangle } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const UserBanned = () => {
    return (
        <div className="flex items-center justify-center py-12 h-screen">
            <div className="space-y-4 text-center">
                <div className="relative">
                    <AlertTriangle className="h-8 w-8 text-rose-500 mx-auto" />
                    <h1 className="text-4xl font-extrabold tracking-tight">Banned</h1>
                </div>
                <p className="mx-auto max-w-2xl text-gray-500">
                    Your account has been banned for violating our terms of service.
                </p>
                <div className="flex justify-center">
                    <Button onClick={() => signOut()}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
