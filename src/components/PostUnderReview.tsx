import Link from 'next/link'
import React from 'react'

export const PostUnderReview = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[800px] space-y-4">
            <div className="space-y-2 text-center">
                <div className="text-6xl text-[#f59e0b] flex items-center justify-center">
                    <LeafIcon className="h-16 w-16" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Post Not Found.</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    The post you're looking for has been reported and is currently under review.
                </p>
            </div>
            <Link
                className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/discussion"
            >
                Go back
            </Link>
        </div>
    )

    function LeafIcon(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        )
    }
}
