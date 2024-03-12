import { z } from "zod";

export type PaymentGcashType = z.infer<typeof PaymentGcashSchema>
export const PaymentGcashSchema = z.object({
    receipt: z.record(z.string()),
})