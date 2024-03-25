"use client";
import DisplayPhoto from "@/../public/images/default-user.jpg";
import EditorOutput from "@/app/components/(user)/EditorOutput";
import RelativeDate from "@/app/components/RelativeDate";
import DeleteDialog from "@/app/components/dialogs/DeletePost";
import { PostUnderReview } from "@/components/PostUnderReview";
import { Comment, Post } from "@/lib/types";
import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEllipsis } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { Discuss, RotatingLines } from "react-loader-spinner";
import Comments from "../../components/Comments";
import PostButtons from "../../components/postButtons";
import { ReportPost } from "./_components/ReportPost";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: { postId: string };
}

const page: FC<Props> = ({ params }) => {
  const [posts, setPosts] = useState<Post>();
  // const [comments, setComments] = useState<Comment>();
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   fetchPost();
  // }, [params.postId]);

  // const fetchPost = async () => {
  //   try {
  //     const response = await fetch(`/api/user/post/${params.postId}`, {
  //       next: { tags: ["comments"], revalidate: 60 },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     setPosts(data);
  //     fetchComments();
  //   } catch (error) {
  //     console.error("Error fetching post:", error);
  //   }
  // };

  // const fetchComments = async () => {
  //   try {
  //     await axios
  //       .get(`/api/user/post/${params.postId}/comments`)
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

  const fetchPostss = async () => {
    try {
      const result = await axios.get(`/api/user/post/`);
      const Post = result.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/post/${params.postId}`, {
        next: { tags: ["comments"], revalidate: 60 },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [params.postId]);

  // const fetchComments = useCallback(async () => {
  //   try {
  //     const result = await axios.get(
  //       `/api/user/post/${params.postId}/comments`
  //     );
  //     const comments = result.data;
  //     setComments(comments);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // }, [params.postId]);

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/user/post/${params.postId}/comments`)
        return data
      } catch (error: any) {
        throw new Error(`Error fetching comments: ${error.message}`);
      }
    }
  })

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  console.log(session?.user.role);

  function handleDelete(): void {
    throw new Error("Function not implemented.");
  }

  const handlePostDeleted = () => {
    fetchPostss();
  };

  return (
    <main className="pb-20 max-md:dark:bg-[#242526] dark:bg-[#18191A]">
      {posts ? (
        posts.reports >= 4 ? (
          session?.user.role === "USER" || session?.user.role === undefined ? (
            <PostUnderReview />
          ) : (
            <div className="dark:bg-[#242526] px-10 max-md:px-3 max-md:pt-0 py-5 mt-5 rounded-lg shadow-lg ">
              <button type="button" onClick={() => router.back()}>
                <FiArrowLeft />
              </button>

              <div className="flex items-center justify-between  ">
                <div className="flex items-center gap-4">
                  <Link
                    href={""}
                    className="flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black"
                  >
                    {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                    <Image
                      src={posts.author.image || DisplayPhoto}
                      alt="User Image"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <div className="flex items-center gap-3">
                    {/*Username*/}
                    <h1 className="text-lg font-poppins font-medium">
                      {posts.author.username}
                    </h1>
                    <div className="rounded-full w-1 h-1 bg-black"></div>
                    {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                    <h3 className="text-[0.7rem] font-poppins text-gray-500">
                      <RelativeDate dateString={posts.createdAt} />
                    </h3>
                  </div>
                </div>
                {posts.authorId === session?.user?.id && (
                  <Popover>
                    <Popover.Button>
                      <FaEllipsis />
                    </Popover.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel className="absolute top-0 max-md:right-2 right-0  bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                        <button
                          type="button"
                          className="flex gap-1 hover:underline w-full"
                        >
                          <AiOutlineEdit /> Edit
                        </button>
                        <button
                          type="button"
                          className="flex gap-1 hover:underline w-full"
                        >
                          <AiOutlineEdit /> Delete
                        </button>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                )}
                {posts.authorId !== session?.user.id && session?.user && (
                  <Popover>
                    <Popover.Button>
                      <FaEllipsis />
                    </Popover.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel className="absolute top-0 max-md:right-2 right-0  bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                        <ReportPost
                          //@ts-ignore
                          post={posts}
                        />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                )}
              </div>
              <h1 className="text-[1.5rem] font-poppins font-extrabold">
                {posts.title}
              </h1>
              <div className="flex items-center font-poppins font-semibold gap-3 text-[0.5rem]">
                <span>Topic:</span>
                <span className="text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white">
                  {posts.topic.name}
                </span>
              </div>

              <div className="mt-2 w-full">
                {/**Description */}
                <div className={"w-full"}>
                  <EditorOutput content={posts.content} />
                </div>
                {/**Like, Comment, Share(if there is any) Section*/}
                <div className="mt-10">
                  <PostButtons
                    postId={posts.id}
                    comments={posts.comments.length}
                  />
                </div>
              </div>
              {comments ? (
                <Comments posts={posts} />
              ) : (
                <div className="w-full text-center flex items-center justify-center">
                  <Discuss
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    colors={["green", "yellow"]}
                  />
                </div>
              )}
            </div>
          )
        ) : (
          <div className="dark:bg-[#242526] px-10 max-md:px-3 max-md:pt-0 py-5 mt-5 rounded-lg shadow-lg ">
            <button type="button" onClick={() => router.back()}>
              <FiArrowLeft />
            </button>

            <div className="flex items-center justify-between  ">
              <div className="flex items-center gap-4">
                <Link
                  href={{
                    pathname: `/discussion/user/${posts.author.username}`,
                    query: { id: posts.authorId },
                  }}
                  className="flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black"
                >
                  {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                  <Image
                    src={posts.author.image || DisplayPhoto}
                    alt="User Image"
                    width={40}
                    height={40}
                  />
                </Link>
                <div className="flex items-center gap-3">
                  {/*Username*/}
                  <h1 className="text-lg font-poppins font-medium">
                    {posts.author.username}
                  </h1>
                  <div className="rounded-full w-1 h-1 bg-black"></div>
                  {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                  <h3 className="text-[0.7rem] font-poppins text-gray-500">
                    <RelativeDate dateString={posts.createdAt} />
                  </h3>
                </div>
              </div>
              {posts.authorId === session?.user?.id && (
                <Popover>
                  <Popover.Button>
                    <FaEllipsis />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute top-0 max-md:right-2 right-0  bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                      <button
                        type="button"
                        className="flex gap-1 hover:underline w-full"
                      >
                        <AiOutlineEdit /> Edit
                      </button>
                      <button
                        type="button"
                        className="flex gap-1 hover:underline w-full"
                      ></button>
                      <DeleteDialog
                        postId={posts.id}
                        onDelete={handlePostDeleted}
                      />
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )}
              {posts.authorId !== session?.user.id && session?.user && (
                <Popover>
                  <Popover.Button>
                    <FaEllipsis />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute top-0 max-md:right-2 right-0  bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                      <ReportPost
                        //@ts-ignore
                        post={posts}
                      />
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )}
            </div>
            <h1 className="text-[1.5rem] font-poppins font-extrabold">
              {posts.title}
            </h1>
            <div className="flex items-center font-poppins font-semibold gap-3 text-[0.5rem]">
              <span>Topic:</span>
              <span className="text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white">
                {posts.topic.name}
              </span>
            </div>

            <div className="mt-2 w-full">
              {/**Description */}
              <div className={"w-full"}>
                <EditorOutput content={posts.content} />
              </div>
              {/**Like, Comment, Share(if there is any) Section*/}
              <div className="mt-10">
                <PostButtons
                  postId={posts.id}
                  comments={posts.comments.length}
                />
              </div>
            </div>
            {comments ? (
              <Comments posts={posts} />
            ) : (
              <div className="w-full text-center flex items-center justify-center">
                <Discuss
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                  colors={["green", "yellow"]}
                />
              </div>
            )}
          </div>
        )
      ) : (
        <>
          <div className="text-center flex justify-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          </div>
        </>
      )}
    </main>
  );
};
export default page;
