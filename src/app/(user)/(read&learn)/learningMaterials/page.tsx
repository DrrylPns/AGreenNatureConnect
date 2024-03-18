import prisma from "@/lib/db/db";
import { TabLM } from "./_components/TabLM";


async function LearningMaterials() {

  const learningmats = await prisma.community.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      LearningMaterial: {
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
      <TabLM
        //@ts-ignore
        communities={learningmats} />
    </>
  );
}

export default LearningMaterials;
