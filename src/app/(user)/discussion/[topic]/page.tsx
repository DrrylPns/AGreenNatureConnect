"use client";
import EditorOutput from "@/app/components/(user)/EditorOutput";
import { PostTypes, Topic } from "@/lib/types";
import axios from "axios";
import DisplayPhoto from "@/../public/images/default-user.jpg";
import React, { FC, useEffect, useRef, useState } from "react";
import PostButtons from "../components/postButtons";
import Image from "next/image";
import RelativeDate from "@/app/components/RelativeDate";
import { FaEllipsis } from "react-icons/fa6";
import Link from "next/link";

interface Pageprops {
  params: { topic: string };
}

const page: FC<Pageprops> = ({ params }) => {
  const [topic, setTopic] = useState<Topic>();
  const pref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPostsByTopicName();
  }, [params.topic]);

  const fetchPostsByTopicName = async () => {
    try {
      const response = await axios.get(`/api/user/topic/${params.topic}`);
      const data = response.data;
      setTopic(data);
    } catch (error) { }
  };

  return (
    <main className="pb-20">
      {topic ? (
        <div className="dark:bg-[#242526]">
          <h1 className="text-gray-600 font-bold font-livvic">
            There are total of{" "}
            <span className="">
              {topic?.posts.length} post/s in {topic?.name} right now!
            </span>
          </h1>
          {topic.posts.map((post) => {
            const showPost = post.reports < 5;

            return showPost ? (
              <Link
                href={{
                  pathname: `/discussion/${topic.name}/${post.id}`,
                  query: { postId: post.id },
                }}
              >
                <div
                  key={post.id}
                  className="bg-white dark:bg-[#242526] w-full max-md:rounded-none  rounded-xl p-5 mt-3 drop-shadow-md shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center overflow-hidden justify-center rounded-full border w-userImage h-[2.5rem] border-black">
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
                    <button type="button" onClick={() => { }}>
                      <FaEllipsis />
                    </button>
                  </div>
                  {/**Description & Images */}
                  <h1 className="text-[1.5rem] font-poppins font-extrabold">
                    {post.title}
                  </h1>
                  <div className="flex items-center font-poppins font-semibold gap-3 text-[0.5rem]">
                    <span>Topic:</span>
                    <span className="text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white">
                      {topic.name}
                    </span>
                  </div>
                  <div
                    className="relative text-sm max-h-40 w-full overflow-clip"
                    ref={pref}
                  >
                    <EditorOutput content={post.content} />
                    {pref.current?.clientHeight === 160 ? (
                      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                    ) : null}
                  </div>
                  {/**Like, Comment, Share(if there is any) Section*/}
                  {/* <PostButtons comments={post.comments.length} likes={post.likes.length} /> */}
                </div>
              </Link>
            ) : null
          })}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};
export default page;
