import { z } from "zod"

export type CreateReplyType = z.infer<typeof ReplySchema>

export const ReplySchema = z.object({
    text: z.string({required_error:"Please type your reply", invalid_type_error:"Name must be a string"}).min(1,{message:"Please type your reply first."}),
    commentId: z.string(),
})