"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/Ui/Card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu"
import { toast } from "@/lib/hooks/use-toast"

import type { Blogs } from "@/lib/types/blogs"
import { formatDate } from "@/lib/utils"
import { QueryClient, useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { FaEllipsis } from 'react-icons/fa6'

interface BlogCardProps extends Blogs {
    queryClient: QueryClient | undefined;
}

const BlogCard = ({ id, title, content, createdAt, updatedAt, author, session, queryClient }: BlogCardProps) => {

    const { mutate: deleteTask, isLoading: deleteLoading } = useMutation({
        mutationFn: async () => {
            await axios.post('api/employee/deleteBlog', { id: id })
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: "Invalid Action!",
                        description: "You are not authorized to delete a blog.",
                        variant: "destructive",
                    });
                }
            }

            return toast({
                title: "Something went wrong!",
                description: "Your blog was not deleted, please try again later",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            toast({
                description: "The blog has been deleted.",
            });

            queryClient?.invalidateQueries
        },
    })

    return (
        <Card className="">
            <CardHeader className="h-auto">
                <div className="flex flex-row justify-between gap-11">
                    <div>
                        <Link href={`/blogs/${id}`}>
                            <CardTitle className="custom-card-title h-[30px] max-md:truncate max-md:max-w-[220px]">{title}</CardTitle>
                        </Link>
                    </div>
                    <div className="cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                {session?.user.role === "EMPLOYEE" && (
                                    <FaEllipsis />
                                )}
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="cursor-pointer">
                                <DropdownMenuLabel>Edit</DropdownMenuLabel>
                                <DropdownMenuLabel className="text-red-700" onClick={() => deleteTask()}>{deleteLoading ? "Deleting..." : "Delete"}</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p></p> {/* Content should be image? */}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
            </CardFooter>
        </Card >
    )
}

export default BlogCard