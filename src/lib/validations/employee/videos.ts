import { z } from "zod"

export type CreateVideoType = z.infer<typeof CreateVideoSchema>

export const CreateVideoSchema = z.object({
    title: z.string(),
    description: z.string(),
    video: z.string().optional(),
});

export type UpdateVideoType = z.infer<typeof UpdateVideoSchema>

export const UpdateVideoSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    video: z.string().optional(),
});