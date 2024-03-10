"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import DisplayPhoto from "@/../public/images/default-user.jpg";
import PostButtons from "./postButtons";
import { FaEllipsis } from "react-icons/fa6";
import axios from "axios";
import { Post } from "@/lib/types";
import RelativeDate from "@/app/components/RelativeDate";
import Link from "next/link";
import EditorOutput from "@/app/components/(user)/EditorOutput";
import PostSkeleton from "./Skeleton/PostSkeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import RotatingLinesLoading from "@/app/(markethub)/components/RotatingLinesLoading";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

type PostProps = {
  getAllPost: Post[];
  nextId: string;
};
export default function Post() {
  const pref = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const { data: session } = useSession();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  const {
    isLoading,
    isError,
    data: Posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = "" }) => {
      try {
        const { data } = await axios.get(`/api/user/post?cursor=${pageParam}`);
        return data as PostProps;
      } catch (error: any) {
        throw new Error(`Error fetching post: ${error.message}`);
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextId || undefined,
  });

  if (isLoading) return;
  <div className="flex gap-3 drop-shadow-xl shadow-xl">
    <PostSkeleton />
  </div>;
  if (isError) return <div>Error!</div>;

  return (
    <section className="sm:px-[3%] lg:pr-[30%]">
      {Posts.pages.map((post) => (
        <div key={post.nextId}>
          {post.getAllPost !== undefined &&
            post.getAllPost.map((post) => (
              <Link
                href={{
                  pathname: `/discussion/${post.topic.name}/${post.id}`,
                  query: { postId: post.id },
                }}
                key={post.id}
              >
                <div
                  key={post.id}
                  className="bg-gray-50 border-gray-200 border-2 dark:bg-[#242526] w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full pb-3 gap-4 border-b-4 mb-3 border-gray-300">
                      <div className="flex items-center overflow-hidden justify-center  rounded-full w-[3.5rem] h-[3.5rem] border-gray-200 border-2 shadow-sm drop-shadow">
                        {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                        <Image
                          src={post.author.image || DisplayPhoto}
                          alt="User Image"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex items-baseline gap-3">
                        {/*Username*/}
                        <div>
                        <h1 className="text-xl font-poppins font-bold">
                          {post.author.username}
                        </h1>
                        <Badge variant="secondary" className="text-[0.6rem] border-gray-200">{post.author.role === 'USER'?'Member': post.author.role}</Badge>
                        </div>
                        {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                        <h3 className="text-[0.7rem] font-poppins">
                          <RelativeDate dateString={post.createdAt} />
                        </h3>
                      </div>
                    </div>
                    {post.authorId === session?.user?.id && (
                      <button type="button" onClick={() => {}}>
                        <FaEllipsis />
                      </button>
                    )}
                  </div>
                  {/**Description & Images */}
                  <h1 className="text-[1.5rem] px-5 font-poppins font-extrabold">
                    {post.title}
                  </h1>
                  <div className="flex items-center px-5 font-poppins font-semibold gap-3 text-[0.5rem]">
                    <span>Topic:</span>
                    <span className="text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white">
                      {post.topic.name}
                    </span>
                  </div>
                  <div
                    className="relative text-sm px-5 max-h-40 w-full overflow-clip"
                    ref={pref}
                  > 
                    <EditorOutput content={post.content} />
                    {pref.current?.clientHeight === 160 ? (
                      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                    ) : null}
                  </div>
                  {/**Like, Comment, Share(if there is any) Section*/}
                  <PostButtons
                    comments={post.comments.length}
                    postId={post.id}
                  />
                </div>
              </Link>
            ))}
          {isFetchingNextPage && (
            <div className="transition-all text-center duration-500 ease-in-out animate-bounce">
              Loading...
            </div>
          )}
          <span ref={ref} className="invisible absolute">
            intersection observer marker
          </span>
        </div>
      ))}
    </section>
  );
}
