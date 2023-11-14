import { z } from "zod"

// CREATE SCHEMA
export type CreateBlogType = z.infer<typeof BlogSchema>

export const BlogSchema = z.object({
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    content: z.any(),
})

// DELETE SCHEMA
export type DeleteBlogType = z.infer<typeof DeleteBlogSchema>

export const DeleteBlogSchema = z.object({
    id: z.string()
})

// UPDATE SCHEMA 
export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>

export const UpdateBlogSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, { message: "Title must be longer than 3 characters" }).max(128, { message: "Title must be atleast 128 characters" }),
    content: z.any(),
})