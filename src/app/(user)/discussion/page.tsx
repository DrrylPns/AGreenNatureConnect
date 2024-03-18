import React from "react";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import FeaturedTopics from "./components/FeaturedTopics";

import { WarnUser } from "@/components/WarnUser";
import { getAuthSession } from "../../../lib/auth";

export default async function Discussion() {
  const session = await getAuthSession()
  return (
    <div className="dark:bg-[#18191A]">
      {session?.user.numberOfViolations === 1 || session?.user.numberOfViolations === 2 && <div>
        <WarnUser />
      </div>}
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
