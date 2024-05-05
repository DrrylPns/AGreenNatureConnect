import prisma from "@/lib/db/db"
import { ChatRoom } from "../_components/ChatRoom"
import { ChatRoomWithMessagesAndCommunity } from "@/lib/types"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewChatRoomV2 } from "../_components/NewChatRoomV2"

interface Props {
    params: { chatroomId: string }
}

const ChatRoomPage = async ({ params }: Props) => {

    const session = await getAuthSession()

    if (!session) redirect("/discussion")

    const user = await prisma.user.findUnique({
        where: { id: session?.user.id },
        include: {
            Community: true
        }
    })

    const community = await prisma.community.findUnique({
        where: { id: user?.Community?.id },
        include: {
            messages: true
        }
    })

    const chatroom = await prisma.chatRoom.findUnique({
        where: {
            id: params.chatroomId,
            communityId: community?.id
        },
        include: {
            user: true,
            community: true,
            messages: true,
        }
    })

    if (!chatroom) return <>Error fetching chatroom</>

    return (
        <div className='pb-11 rounded-lg'>
            {/* <ChatRoom chatroom={chatroom as ChatRoomWithMessagesAndCommunity} userId={user?.id!} /> */}
            <NewChatRoomV2 chatroom={chatroom} />
        </div>
    )
}

export default ChatRoomPage