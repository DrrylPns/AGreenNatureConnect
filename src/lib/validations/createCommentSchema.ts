import { z } from "zod"

export type CreateCommentType = z.infer<typeof CommentSchema>

export const CommentSchema = z.object({
    text: z.string({required_error:"Please type your comment", invalid_type_error:"Name must be a string"}).min(1,{message:"Please type your comment first."}),
    postId: z.string(),
})