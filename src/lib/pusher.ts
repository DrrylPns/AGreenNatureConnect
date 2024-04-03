import PusherServer from "pusher"
import PusherClient from "pusher-js"
import { enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

export function formatTime(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.valueOf())) {
        console.error('Invalid date:', date);
        return 'Invalid date';
    }

    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: enUS,
    });
}


export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap1",
    useTLS: true
})

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        cluster: "ap1"
    }
)