import { z } from "zod";

export type PasabuyType = z.infer<typeof PasabuySchema>

// const CommunityImageSchema = z.object({
//     imageUrl: z.string().url(), // Assuming imageUrl is a URL string
// });

export const PasabuySchema = z.object({
    form: z.optional(z.string()),

    urbanFarmName: z.string({
        required_error: "Urban farm name required!"
    }),

    email: z.string({
        required_error: "Email required!"
    }).email().refine(email => email.length <= 255, { message: "Email is too long" }),
      
    blk: z.string({
        required_error: "Blk / House # is required"
    }),
    street: z.string({
        required_error: "Street address is required"
    }),
    postal: z.string().min(4, { message: "Invalid postal code." }).max(4, { message: "Invalid zip code." }),

    fullAddress: z.string({
        required_error: "Full Address is required"
    })
})
