"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef, Fragment } from "react";
import DisplayPhoto from "@/../public/images/default-user.jpg";
import PostButtons from "./postButtons";
import { FaEllipsis, FaFilter } from "react-icons/fa6";
import axios from "axios";
import { Post } from "@/lib/types";
import RelativeDate from "@/app/components/RelativeDate";
import Link from "next/link";
import EditorOutput from "@/app/components/(user)/EditorOutput";
import PostSkeleton from "./Skeleton/PostSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { Listbox, Popover, Transition } from "@headlessui/react";
import { TbFilterSearch } from "react-icons/tb";

type PostProps = {
  getAllPost: Post[];
  nextId: string;
};

const filters = [
  {value:"none", display:"none"},
  {value:"Check", display:"Liked"},
  {value:"XMark", display:"Unliked"},
  {value:"Leaf", display:"Loved"},
  {value:"Laugh", display:"Laughed"},
 
]
export default function Post() {
  const pref = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const { data: session, status } = useSession();
  const [ selectedFilter, setSelectedFilter] = useState<string>(filters[0].value)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const userId = session?.user.id
  const {
    isLoading,
    isError,
    data: Posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", selectedFilter, userId],
    queryFn: async ({ pageParam = "" }) => {
      try {
        const { data } = await axios.get(`/api/user/post?cursor=${pageParam}&userId=${userId}&filter=${selectedFilter}`);
        return data as PostProps;
      } catch (error: any) {
        throw new Error(`Error fetching post: ${error.message}`);
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextId || undefined,
  });
 
  if (isLoading) return (
  <div className="sm:px-[3%] lg:pr-[30%]">
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </div>);
  if (isError) return <div>Error!</div>;

  return (
    <section className="sm:px-[3%] lg:pr-[30%]">
      {status === 'authenticated' && (
         <div className='relative  flex mt-3 items-center justify-end '>
         
         <Listbox value={selectedFilter} onChange={setSelectedFilter}>
         <div className="relative">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold">Filter:</h1>
            <Listbox.Button className={'bg-green font-semibold relative w-24 p-2 text-sm rounded-md flex items-center justify-around text-white shadow-md drop-shadow-md '}>
              {selectedFilter === "Check" && "Liked"} 
              {selectedFilter === "XMark" && "Unliked"} 
              {selectedFilter === "Leaf" && "Loved"} 
              {selectedFilter === "Laugh" && "Laughed"} 
              {selectedFilter === "none" && "none"} 
              <span className='font-bold text-lg'><TbFilterSearch /></span>
            </Listbox.Button>
         </div>
         <Transition
             as={Fragment}
             leave="transition ease-in duration-500"
             leaveFrom="opacity-100"
             leaveTo="opacity-0"
         >
             <Listbox.Options className="absolute z-40 top-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg drop-shadow-md ring-2 ring-black/5 focus:outline-none sm:text-sm">
                 {filters.map((filter)=>(
                     <Listbox.Option
                     value={filter.value}
                     className='relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-gray-100 text-gray-900'
                     >
                     {filter.display}
                     </Listbox.Option>
                 ))}
             </Listbox.Options>
         </Transition>
         </div>
         </Listbox>
     </div>
      )}
     
      {Posts.pages.map((post) => (
        <div key={post.nextId}>
          {post.getAllPost !== undefined &&
            post.getAllPost.map((post) => {
              // PALITAN 5 PAG TAPUS NA TESTING
              const showPost = post.reports < 5;

              return showPost ? (
                <Link
                  href={{
                    pathname: `/discussion/${post.topic.name}/${post.id}`,
                    query: { postId: post.id },
                  }}
                  key={post.id}
                >
                  <div
                    key={post.id}
                    className="bg-white border-gray-200 border-2 dark:bg-[#242526] dark:border-none w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black">
                          {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                          <Image
                            src={post.author.image || DisplayPhoto}
                            alt="User Image"
                            width={40}
                            height={40}
                          />
                        </div>

                        <div className="flex items-baseline gap-3">
                          {/*Username*/}
                          <h1 className="text-lg font-poppins font-medium">
                            {post.author.username}
                          </h1>
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
              ) : null;
            })}
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
