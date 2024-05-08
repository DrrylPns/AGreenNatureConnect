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
        name: z
        .string()
        .min(3, { message: "Name is too short." })
        .max(50, { message: "Name is too long" })
        .regex(/^[A-Za-z]+$/, { message: "Name must contain only letters." }),
      lastName: z
        .string()
        .min(3, { message: "Lastname is too short." })
        .max(50, { message: "Lastname is too long" })
        .regex(/^[A-Za-z]+$/, { message: "Lastname must contain only letters." }),

        suffix: z.string()
      
})

export type OnboardingUserType = z.infer<typeof OnboardingUserSchema>

export const OnboardingUserSchema = z.object({
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
    address: z.string()
        .min(5, { message: "Minimum length of address is 5" })
        .max(100, { message: "Maximum length of address is 100" })
        .optional(),
        name: z
        .string()
        .min(3, { message: "Name is too short." })
        .max(50, { message: "Name is too long" })
        .regex(/^[A-Za-z]+$/, { message: "Name must contain only letters." }),
      lastName: z
        .string()
        .min(3, { message: "Lastname is too short." })
        .max(50, { message: "Lastname is too long" })
        .regex(/^[A-Za-z]+$/, { message: "Lastname must contain only letters." }),

        suffix: z.string()
      
})