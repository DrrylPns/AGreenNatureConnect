import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Ui/Avatar"

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    const isImageNull = user.image === null

    return (
        <Avatar>
            <AvatarImage
                className='cursor-pointer'
                src={`${isImageNull ? "/images/avatar-placeholder.jpg" : user.image}`}
                width={25}
                height={25}
                alt='User Profile' />
            <AvatarFallback>User Profile</AvatarFallback>
        </Avatar>
    )
}