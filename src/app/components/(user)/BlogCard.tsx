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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/Ui/Dialog"
import { toast } from "@/lib/hooks/use-toast"
import type { Blogs } from "@/lib/types/blogs"
import { formatDate } from "@/lib/utils"
import { QueryClient, useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaEllipsis } from 'react-icons/fa6'
import { Button } from "../Ui/Button"

const BlogCard = ({ id, title, content, createdAt, updatedAt, author, session }: Blogs) => {
    const router = useRouter()

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

            // not working atm router.refresh or push
            // router.refresh()

            // location.reload to revise to router.refresh()... TODO
            setTimeout(() => {
                location.reload()
            }, 1000)

            return toast({
                description: "The blog has been deleted.",
            });
        },
    })

    return (
        <Dialog>
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
                                    {/* <DropdownMenuLabel className="text-red-700" </DropdownMenuLabel> */}
                                    <DialogTrigger>
                                        <DropdownMenuLabel className="text-red-700">Delete</DropdownMenuLabel>
                                    </DialogTrigger>
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this blog?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant='green'
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={() => !deleteLoading && deleteTask()}
                            disabled={deleteLoading}
                            isLoading={deleteLoading}
                        >
                            {deleteLoading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BlogCard