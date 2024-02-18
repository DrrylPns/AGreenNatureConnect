import React from "react";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import FeaturedTopics from "./components/FeaturedTopics";

export default function Discussion() {
  return (
    <div className="dark:bg-[#18191A]">
      <section>
        <CreatePost />
        <Post />
      </section>
      <section>
        <FeaturedTopics />
      </section>
    </div>
  );
}
