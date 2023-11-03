import React from "react";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Community from "./components/Community";

export default function Discussion() {
  return (
    <div className="pt-[8rem] md:pt-[6rem]">
      <section>
        <CreatePost />
        <Post />
      </section>
      <section>
        <Community />
      </section>
    </div>
  );
}
