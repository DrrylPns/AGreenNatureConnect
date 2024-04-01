import { getAuthSession } from '@/lib/auth'
import ChatComponent from './_components/ChatComponent'
import prisma from '@/lib/db/db'
import { redirect } from 'next/navigation'

const MessagePage = async () => {

    const session = await getAuthSession()

    if (!session) redirect("/discussion")

    const user = await prisma.user.findUnique({
        where: { id: session?.user.id }
    })

    return (
        <div>
            <ChatComponent user={user!} />
        </div>
    )
}

export default MessagePage