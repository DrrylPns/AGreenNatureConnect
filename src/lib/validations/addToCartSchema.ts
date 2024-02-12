import { z } from "zod"

export type CreateAddToCartType = z.infer<typeof CartSchema>

export const CartSchema = z.object({
    variantId: z.string(),
    communityId: z.string(),
})

// DElete Cart items Schema
export type DeleteCartItemType = z.infer<typeof DeleteCartItemSchema>

export const DeleteCartItemSchema = z.object({
   id: z.string(),
   
})