import {z} from "zod"

export type CreateProductType = z.infer<typeof CreateProductSchema>

export const CreateProductSchema = z.object({
    name: z.string()
        .min(3, {message: "Minimum product name should be 3 characters"})
        .max(20, {message: "Maximum product name should be 20 characters"}),
    kilo: z.coerce.number(),
    price: z.coerce.number(),
})

export type UpdateProductType = z.infer<typeof UpdateProductSchema>

export const UpdateProductSchema = z.object({
    id: z.string().optional(),
    itemNumber: z.coerce.number().optional(),
    name: z.string(),
    kilo: z.coerce.number(),
    price: z.coerce.number(),
})