import prisma from "@/lib/db/db";
import { TabBlogs } from "./_components/TabBlogs";


async function Blogs() {
  const communities = await prisma.community.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      blogs: {
        include: {
          author: true
        },
        where: {
          isApproved: "APPROVED"
        },
      }
    }
  });
  return (
    <>
      <TabBlogs
        // @ts-ignore
        communities={communities} />
    </>
  );
}

export default Blogs;
