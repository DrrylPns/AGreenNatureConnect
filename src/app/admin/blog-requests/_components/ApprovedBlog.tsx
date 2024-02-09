"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatDate } from "@/lib/utils";
import { EnumValues } from "zod";
import { Separator } from "@/app/components/Ui/Separator";
import { Button } from "@/app/components/Ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Ui/Dialog";
import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { CopyIcon } from "lucide-react";
import EditorOutput from "@/app/components/(user)/EditorOutput";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/components/Ui/alert-dialog";
import { toast } from "@/lib/hooks/use-toast";
import { useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: any;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  isApproved: EnumValues;
  author: User;
  community: Community;
};

type User = {
  id: string;
  name?: string;
  lastName?: string;
  Blog: Blog[];
};

type Community = {
  id: string;
  name: string;
  blogs: Blog[];
};

export const ApprovedBlog = () => {

  const [status, setStatus] = useState('');
  
  const { isLoading, isError, data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/user/getBlogs/approved");
        return data as Blog[];
      } catch (error: any) {
        throw new Error(`Error fetching communities: ${error.message}`);
      }
    }
  })

  if (isLoading) return <>Fetching Blogs...</>

  if (isError) return <>Error fetching Blogs...</>

  const updatedBlogStatus = async (blogId: string, newStatus: string) => {

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blogId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setStatus(newStatus);

      toast({
        description: `Successfully ${newStatus} the blog`,
        variant: "default"
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000)

    } catch (error) {
      console.error('Error:', error);
      toast({
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  }

  const handleApprove = async (blogId: string) => {
    await updatedBlogStatus(blogId, "APPROVED")
  }

  const handleDecline = async (blogId: string) => {
    await updatedBlogStatus(blogId, "DECLINED")
  }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-11">

      {blogs.map((blog) => (
        //@ts-ignore
        <div>{blog.isApproved === "APPROVED" ? (
          <Card shadow="sm" className="shadow-md border border-[#a2a2a2]/30 rounded-lg" key={blog.id}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={blog.title}
                className="w-full object-cover h-[140px] shadow-md rounded-lg"
                src={blog.thumbnail}
              />
            </CardBody>
            <CardFooter className="text-sm flex flex-col text-start justify-start items-start gap-2">
              <b className="text-zinc-700">{blog.title}</b>
              <p className="text-[#868686]">Upload Date: {formatDate(blog.createdAt)}</p>
              <p className="text-[#868686]">Author: {" "}
                <span className="underline">
                  {blog.author.name} {" "} {blog.author.lastName}
                </span>
              </p>

              <Separator className="bg-zinc-400" />

              <div className="flex gap-3 justify-between w-full items-center">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="hover:bg-transparent/10">Click to view.</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{blog.title}</DialogTitle>
                        <DialogDescription>
                          <p className="text-[#868686]">Upload Date: {formatDate(blog.createdAt)}</p>
                          <p className="text-[#868686]">Author: {" "}
                            <span className="underline">
                              {blog.author.name} {" "} {blog.author.lastName}
                            </span>
                          </p>

                          <Separator className="bg-zinc-400 my-3" />

                          <EditorOutput key={blog.id} content={blog.content} />
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant={"newGreen"}>
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-x-2">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant={"destructive"}>
                        Decline
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will decline the requested blog of the employee.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-rose-500 hover:bg-rose-500/80">

                          Cancel

                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#099073] hover:bg-[#099073]/80"
                          onClick={() => handleDecline(blog.id)}
                        >

                          Continue

                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </div>

              </div>

            </CardFooter>
          </Card>
        ) :
          <div>
            No Results Found.
          </div>
        }</div>
      ))}
    </div>
  )
}
