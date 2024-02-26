
import CheckoutModal from "../../components/CheckooutModal"
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db"


async function page() {
  const session = await getAuthSession()

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