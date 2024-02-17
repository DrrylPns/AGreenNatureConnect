import { Prisma } from "@prisma/client"
import CheckoutModal from "../../components/CheckooutModal"
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db"


async function page() {
  const session = await getAuthSession()

  const getShippingInfo = await prisma.shippingInfo.findUnique({
    where:{
        id: session?.user.id
    },
})
  return (
    <div>
      <CheckoutModal shippingInfoProp={getShippingInfo}/>
    </div>
    
)}

export default page