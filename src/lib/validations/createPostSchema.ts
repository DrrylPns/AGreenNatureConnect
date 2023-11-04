import { z } from "zod"

export type CreatePostType = z.infer<typeof PostSchema>

export const PostSchema = z.object({
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    topicId: z.string().min(2, {message: "Please input a valid topic!"}).max(21, { message: "Please input a valid topic!" }),
    content: z.any(),
})