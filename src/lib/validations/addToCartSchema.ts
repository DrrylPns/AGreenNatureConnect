import { z } from "zod"

export type CreateAddToCartType = z.infer<typeof CartSchema>

export const CartSchema = z.object({
    kilograms: z.coerce.number().optional(),
    packs: z.coerce.number().optional(),
    pieces: z.coerce.number().optional(),
    totalPrice: z.coerce.number(),
    unitOfMeasurement: z.string(),
    communityId: z.string(),
    productId: z.string(),
})

// DElete Cart items Schema
export type DeleteCartItemType = z.infer<typeof DeleteCartItemSchema>

export const DeleteCartItemSchema = z.object({
   id: z.string(),
   
})
