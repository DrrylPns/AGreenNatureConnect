
import CheckoutModal from "../../components/CheckooutModal"
import prisma from "@/lib/db/db"
import { useSession } from "next-auth/react";


async function page() {
  const { data: session, status } = useSession();

  const getShippingInfo = await prisma.shippingInfo.findFirst({
    where:{
        userId: session?.user.id
    },
})

  return (
    <div>
      <CheckoutModal shippingInfoProp={getShippingInfo}/>
    </div>
    
)}

export default page