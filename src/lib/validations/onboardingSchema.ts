import { z } from "zod"

export type OnboardingType = z.infer<typeof OnboardingSchema>

export const OnboardingSchema = z.object({
    username: z.string()
        .min(3, { message: "Minimum length of username is 3" })
        .max(20, { message: "Maximum length of username is 20" })
        .optional(),
    phoneNumber: z.string()
        .refine(phone => {
            const phMobilePattern = /^(09\d{9})$/;
            return phMobilePattern.test(phone)
        }, { message: "Invalid Mobile Number" })
        .optional(),
    birthday: z.coerce.date(),
    community: z.string(),
    address: z.string()
        .min(5, { message: "Minimum length of address is 5" })
        .max(100, { message: "Maximum length of address is 100" })
        .optional(),
})