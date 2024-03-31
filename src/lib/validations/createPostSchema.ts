import { z } from "zod"

export type CreatePostType = z.infer<typeof PostSchema>

export const PostSchema = z.object({
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    topicId: z.string(),
    content: z.any(),
})

export type UpdatePostType = z.infer<typeof UpdatePostSchema>

export const UpdatePostSchema = z.object({
    id: z.optional(z.string()),
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    // topicId: z.string(),
    content: z.any(),
})