import { z } from "zod"

export type CreateTransactionType = z.infer<typeof TransactionSchema>

export const TransactionSchema = z.object({
    buyerId: z.string(),
    sellerId: z.string(),
    products: z.unknown()
})

