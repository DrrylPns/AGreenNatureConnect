import { z } from "zod"

export type ChangeUserProfileType = z.infer<typeof ChangeUserProfileSchema>

// to update kapag may iba na binatong payload, sa ngayon username palang ang na-eedit TODO
export const ChangeUserProfileSchema = z.object({
    newPhone: z.string()
        .refine(phone => {
            const phMobilePattern = /^(09\d{9})$/;
            return phMobilePattern.test(phone)
        }),
    newBirthday: z.coerce.date(),
    newAddress: z.string()
        .min(5, { message: "Minimum length of address is 5" })
        .max(100, { message: "Maximum length of address is 100" }),
})

export type ChangeUsernameType = z.infer<typeof ChangeUsernameSchema>

export const ChangeUsernameSchema = z.object({
    newUsername: z.string().min(3).max(21)
})

export type ChangeCommunitySettingsType = z.infer<typeof ChangeCommunitySettingsSchema>

// to update kapag may iba na binatong payload, sa ngayon username palang ang na-eedit TODO
export const ChangeCommunitySettingsSchema = z.object({
    newPhone: z.string()
        .refine(phone => {
            const phMobilePattern = /^(09\d{9})$/;
            return phMobilePattern.test(phone)
        }),
})