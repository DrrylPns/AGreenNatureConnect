import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Ui/Avatar"

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    const name = user?.name?.charAt(0).toUpperCase()

    return (
        <Avatar>
            <AvatarImage
                className='cursor-pointer'
                src={user?.image!}
                width={25}
                height={25}
                alt='user profile' />
            <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
    )
}