import { z } from "zod"

export type CreatePostType = z.infer<typeof PostSchema>

export const PostSchema = z.object({
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    topicId: z.string().nonempty({ message: "Topic is required" }),
    content: z.any(),
})