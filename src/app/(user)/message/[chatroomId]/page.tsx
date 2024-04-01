import prisma from "@/lib/db/db"
import { ChatRoom } from "../_components/ChatRoom"
import { ChatRoomWithMessagesAndCommunity } from "@/lib/types"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

interface Props {
    params: { chatroomId: string }
}

const ChatRoomPage = async ({ params }: Props) => {

    const session = await getAuthSession()

    if (!session) redirect("/discussion")

    const user = await prisma.user.findUnique({
        where: { id: session?.user.id }
    })

    const chatroom = await prisma.chatRoom.findUnique({
        where: {
            id: params.chatroomId
        },
        include: {
            community: true,
        }
    })

    return (
        <ChatRoom chatroom={chatroom as ChatRoomWithMessagesAndCommunity} userId={user?.id!} />
    )
}

export default ChatRoomPage