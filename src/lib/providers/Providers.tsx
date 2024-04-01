"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from '@nextui-org/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <SessionProvider>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </SessionProvider>
        </QueryClientProvider>
    )
}

export default Providers