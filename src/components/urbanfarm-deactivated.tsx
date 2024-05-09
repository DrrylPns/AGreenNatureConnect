"use client"
import { ServerOffIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export const UrbanFarmDeactivated = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
                <div className="text-center space-y-4">
                    <ServerOffIcon className="h-16 w-16 mx-auto text-red-500" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Urban Farm Deactivated</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your urban farm has been deactivated. Please contact the barangay where you registered for more information.
                    </p>
                    <div
                        className="cursor-pointer inline-flex items-center justify-center h-10 px-6 rounded-md bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                        onClick={() => signOut({
                            redirect: false
                        }).then(() => {
                            router.push("/discussion")
                        })}
                    >
                        Continue
                    </div>
                </div>
            </div>
        </div>
    )
}
