"use client";
import DefaultImage from "@/../public/images/default-user.jpg";
import RelativeDate from "@/app/components/RelativeDate";
import { Button } from "@/app/components/Ui/Button";
import DeleteDialog from "@/app/components/dialogs/Delete";
import { toast } from "@/lib/hooks/use-toast";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { Comment, CommentsWithReplies, PostTypes } from "@/lib/types";
import { CommentSchema, CreateCommentType } from "@/lib/validations/createCommentSchema";
import { Popover, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Filter from "bad-words";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEllipsis } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { fetchReplies } from "../../../../../actions/reply";
import DeleteReply from "@/app/components/dialogs/DeleteReply";
import { EditReplyDialog } from "@/app/components/dialogs/EditReplyDialog";

export default function Comments({ posts }: { posts: PostTypes }) {
  const router = useRouter();
  const { data: session } = useSession();
  const loginModal = useLoginModal();
  const [commentValue, setCommentValue] = useState ("");
  const [comments, setComments] = useState<Comment[]>();
  const [replies, setReplies] = useState<CommentsWithReplies[]>();

  const queryClient = useQueryClient();
  const filter = new Filter();
  const words = require("./extra-words.json");
  filter.addWords(...words);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateCommentType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      text: "",
      postId: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ text, postId }: CreateCommentType) => {
      const payload: CreateCommentType = {
        text,
        postId,
      };
      const { data } = await axios.post(
        `/api/user/post/${posts.id}/comments`,
        payload
      );

      router.refresh();

      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Your post was not published, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });

      toast({
        description: "Your comment has been published.",
      });
    },
  });

  async function onSubmit(data: CreateCommentType) {
    const isInvalidComment = filter.isProfane(data.text);

    if (isInvalidComment) {
      toast({
        title: "Comment Invalid",
        description:
          "Your comment is invalid because you are using a bad word",
        variant: "destructive",
      });
      return;
    }

    const payload: CreateCommentType = {
      text: data.text,
      postId: posts.id,
    };
    createPost(payload);
    router.refresh();
  }

  useEffect(() => {
    fetchComments();
    fetchManyReplies();
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const fetchComments = async () => {
    try {
      const result = await axios.get(`/api/user/post/${posts.id}/comments`);
      const comments = result.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchManyReplies = async () => {
    try {
      const result = await fetchReplies(posts.id);
      //@ts-ignore
      setReplies(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentDeleted = () => {
    fetchComments();
    fetchManyReplies();
  };

  return (
    <div>
      {session ? (
        <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            id="text"
            {...register("text", { required: "Error." })}
            className="bg-[#F0F2F5] dark:bg-[#212121]  min-w-full p-4 pb-8 resize-none border border-gray-300 rounded-2xl"
            placeholder="Add your comment here"
          ></textarea>

          <div className="w-full flex justify-end items-center ">
            <Button
              type="submit"
              variant={"green"}
              className="px-4 py-0 rounded-full text-sm"
            >
              Comment
            </Button>
          </div>
        </form>
      ) : (
        <button
          onClick={loginModal.onOpen}
          className="flex gap-2 items-center justify-center rounded-full drop-shadow-md shadow-md px-2 hover:bg-gray-300"
        >
          <FiPlus />
          Add Comment
        </button>
      )}

      {comments && comments.length < 1 && (
        <div className="text-gray-400 text-[1.3rem] text-center font-poppins font-semibold py-10">
          <h3>There are no comments available right now!</h3>
        </div>
      )}
      {comments ? (
        <div className="p-2 mt-5 w-full">
          {Array.isArray(comments) &&
            comments.map((comment: Comment) => (
              <>
                <div
                  className="flex w-full gap-2 items-center"
                  key={comment.id}
                >
                  <div className="flex items-center overflow-hidden justify-center w-[2rem] h-[2rem] rounded-full border border-black">
                    <Image
                      src={comment.author.image || DefaultImage}
                      alt={"User Image"}
                      width={20}
                      height={20}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="text-[1rem] text-black dark:text-white font-poppins font-medium">
                      {comment.author.username}
                    </h3>
                    <div>
                      {comment.author.role === "EMPLOYEE" && (
                        <h6 className="text-sm text-green dark:text-[#49D393] font-poppins font-medium">
                          Farmer 🌳
                        </h6>
                      )}
                      {comment.author.role === "ADMIN" && (
                        <h6 className="text-sm text-green  dark:text-[#49D393] font-poppins font-medium">
                          Admin 🥦
                        </h6>
                      )}
                    </div>
                    <div className="text-gray-400 text-[0.7rem]">
                      <RelativeDate dateString={comment.createdAt} />
                    </div>
                  </div>

                  {comment.author.id === session?.user?.id && (
                    <Popover>
                      <Popover.Button>
                        <AiOutlineEllipsis />
                      </Popover.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Popover.Panel className="absolute top-0 bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                          <>
                            {/* Remove EditCommentDialog component */}
                            {/* Remove DeleteDialog component */}
                          </>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center justify-center h-[full] w-[2rem] text-gray-600 mt-2 mb-2">
                    <div className="w-[2px] h-full bg-gray-400 hover:bg-green "></div>
                  </div>
                  <div className="w-full">
                    <p className="font-poppins font-light">{comment.text}</p>
                    <div className="w-full flex justify-end">
                      {/* Remove ReplyComment component */}
                    </div>
                    <div></div>
                  </div>
                </div>

                {/* Remove replies loop */}
              </>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}