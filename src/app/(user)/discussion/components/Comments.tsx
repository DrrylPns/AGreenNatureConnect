"use client";
import DefaultImage from "@/../public/images/default-user.jpg";
import RelativeDate from "@/app/components/RelativeDate";
import { Button } from "@/app/components/Ui/Button";
import DeleteDialog from "@/app/components/dialogs/Delete";
import { EditCommentDialog } from "@/app/components/dialogs/EditCommentDialog";
import { ReplyComment } from "@/app/components/dialogs/ReplyComment";
import { toast } from "@/lib/hooks/use-toast";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { Comment, CommentsWithReplies, Post } from "@/lib/types";
import {
  CommentSchema,
  CreateCommentType,
} from "@/lib/validations/createCommentSchema";
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
import { EditReplyDialog } from "@/app/components/dialogs/EditReplyDialog";

export default function Comments({ posts }: { posts: Post }) {
  const router = useRouter();
  const { data: session } = useSession();
  const loginModal = useLoginModal();
  const [commentValue, setCommentValue] = useState("");
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
          "Your commment is invalid because you are using a bad word",
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

  // useEffect(() => {
  //   fetchComments();
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, comments, reset]);

  useEffect(() => {
    fetchComments();
    fetchManyReplies();
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // const fetchComments = async () => {
  //   try {
  //     await axios
  //       .get(`/api/user/post/${posts.id}/comments`)
  //       .then((result) => {
  //         const comments = result.data;
  //         setComments(comments);
  //       })
  //       .catch((error) => {
  //         setComments(error);
  //       });
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

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

  // const { data: replies, isFetching } = useQuery({
  //   queryKey: ["replies"],
  //   queryFn: async () => fetchReplies(posts.id) as CommentsWithReplies
  // });

  // console.log(replies)

  const handleCommentDeleted = () => {
    fetchComments();
    fetchManyReplies();
  };

  const Reply = async () => {
    console.log(
      replies?.map((comment) => {
        return comment.replyOnComent.map((reply) => {
          return reply.text;
        });
      })
    );
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
                  <div>
                    <h3 className="text-[1rem] text-gray-500 font-poppins font-light">
                      {comment.author.username}
                    </h3>
                    {comment.author.role === "STAFF" && (
                      <h6 className="text-lg font-poppins font-medium">
                        Urban Farming Member
                      </h6>
                    )}
                  </div>
                  <div className="text-gray-400 text-[0.7rem]">
                    <RelativeDate dateString={comment.createdAt} />
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
                            <EditCommentDialog
                              commentId={comment.id}
                              text={comment.text}
                              onDelete={handleCommentDeleted}
                            />

                            <DeleteDialog
                              commentId={comment.id}
                              onDelete={handleCommentDeleted}
                            />
                          </>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center justify-center h-[full] w-[2rem] text-gray-600 mt-2">
                    <div className="w-[2px] h-full bg-gray-400 hover:bg-green"></div>
                  </div>
                  <div className="w-full">
                    <p className="font-poppins font-light">{comment.text}</p>
                    <div className="w-full flex justify-end">
                      <ReplyComment
                        commentId={comment.id}
                        onDelete={handleCommentDeleted}
                      />
                    </div>
                    <div></div>
                  </div>
                </div>

                {replies &&
                  Array.isArray(replies) &&
                  replies.map((comments, index) => (
                    <div className="ml-14" key={index}>
                      {comments.replyOnComent.map((reply, replyIndex) => (
                        <div
                          className="flex w-full items-center"
                          key={replyIndex}
                        >
                          {reply.commentId === comment.id && reply.text && (
                            <div className="">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center w-[2rem] h-[2rem] rounded-full border border-black">
                                  <Image
                                    src={reply.user.image || DefaultImage}
                                    alt={"User Image"}
                                    width={20}
                                    height={20}
                                    className="w-full h-full rounded-full"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-[1rem] text-gray-500 font-poppins font-light ">
                                    {reply.user.username}
                                  </h3>
                                  {reply.user.role === "STAFF" && (
                                    <h6 className="text-lg font-poppins font-medium">
                                      Urban Farming Member
                                    </h6>
                                  )}
                                </div>

                                <div className="text-gray-400 text-[0.7rem] ">
                                  <RelativeDate
                                    dateString={reply.createdAt.toISOString()}
                                  />
                                </div>
                                {reply.user.id === session?.user?.id && (
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
                                          <EditReplyDialog
                                            replyId={reply.id}
                                            text={reply.text}
                                            onDelete={handleCommentDeleted}
                                          />

                                          <DeleteDialog
                                            commentId={comment.id}
                                            onDelete={handleCommentDeleted}
                                          />
                                        </>
                                      </Popover.Panel>
                                    </Transition>
                                  </Popover>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <div className="flex items-center justify-center h-[full] w-[2rem] text-gray-600 ml-2 mt-2">
                                  <div className="w-[2px] h-full bg-gray-400 hover:bg-green"></div>
                                </div>
                                <div className="w-full ml-3 mb-4">
                                  <p className="font-poppins font-light">
                                    {reply.text}
                                  </p>
                                </div>{" "}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
              </>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
