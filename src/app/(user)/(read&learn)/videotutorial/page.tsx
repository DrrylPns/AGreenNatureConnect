import prisma from "@/lib/db/db";
import { TabVT } from "./_components/TabVT";

const page = async () => {

  const communities = await prisma.community.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      VideoTutorial: {
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
      <TabVT
        // @ts-ignore
        communities={communities} />
    </>
  );
};

export default page;
