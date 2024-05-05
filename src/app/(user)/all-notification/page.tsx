import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { fetchNotifications } from "../../../../actions/notification"
import { NotifOwnPage } from "./_components/NotifOwnPage"


export default async function Notifpage(){
    
    const allNotification =  await fetchNotifications() as any[]
    const session = await getAuthSession()

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id
      }
    })

    if(!user) return <>No User Found!</>

    return (
    <main className="w-full max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <NotifOwnPage 
        allNotification={allNotification}
        user={user}
      />  
    </main>
    
      )

}