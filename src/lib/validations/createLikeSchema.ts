import { z } from "zod"

export type CreateLikeType = z.infer<typeof LikeSchema>

export const LikeSchema = z.object({
    postId: z.string(),
})