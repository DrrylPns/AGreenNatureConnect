import { getAuthSession } from "@/lib/auth";
import { ShippingInfoForm } from "./_components/shipping-info-form";
import { getUserById } from "../../../../data/user";
import prisma from "@/lib/db/db";
import { UserWithCommunity } from "@/lib/types";


async function shippingInfo() {
  const session = await getAuthSession()

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session?.user.id as string
    },
    include: {
      Community: true
    }
  })

  if (!currentUser) return <>Error fetching current user!</>

  return (
    <div className="flex flex-col items-center">
      <ShippingInfoForm user={currentUser as UserWithCommunity} />
    </div>
  );
}

export default shippingInfo;
