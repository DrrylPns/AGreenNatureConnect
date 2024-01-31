import { z } from "zod"

export type CreateAddToCartType = z.infer<typeof CartSchema>

export const CartSchema = z.object({
    variantId: z.string(),
})