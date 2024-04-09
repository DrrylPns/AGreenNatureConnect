import { z } from "zod"

export type AddReviewType = z.infer<typeof ReviewSchema>

const numberError = { message: "Field must be 1 star up to 5" }

export const ReviewSchema = z.object({
    image: z.string().optional(),
    priceRating: z.coerce.number().min(0, numberError),
    qualityRating: z.coerce.number().min(0, numberError),
    serviceRating: z.coerce.number().min(0, numberError),
    freshnessRating: z.coerce.number().min(0, numberError),
    overAllRating: z.coerce.number().min(0, numberError),
    title: z.string().min(4).max(30),
    description: z.string().min(4),
    productId: z.string(),
    transactionId: z.string().optional(),
})
