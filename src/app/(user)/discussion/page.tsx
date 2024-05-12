import CreatePost from "./components/CreatePost";
import FeaturedTopics from "./components/FeaturedTopics";
import Post from "./components/Post";

import { getAuthSession } from "../../../lib/auth";
import LatestProducts from "./components/Advertise";

export default async function Discussion() {
  const session = await getAuthSession()

  return (
    <div className="dark:bg-[#18191A]">
      <section>
        <CreatePost />
        <Post />
      </section>
      <section className="flex flex-col">
        <FeaturedTopics />
        <LatestProducts/>
      </section>
    </div>
  );
}
