import { z } from "zod"

const numberError = { message: "Field must be 0 or more" }
const variantError = { message: "Variant must be 1 or more" }

export type CreateMaterialType = z.infer<typeof CreateMaterialSchema>

export const CreateMaterialSchema = z.object({
    title: z.string(),
    description: z.string(),
    material: z.string().optional(),
});

export type UpdateMaterialType = z.infer<typeof UpdateMaterialSchema>

export const UpdateMaterialSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    material: z.string().optional(),
});