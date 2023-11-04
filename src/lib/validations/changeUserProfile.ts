import { z } from "zod"

export type ChangeUserProfileType = z.infer<typeof ChangeUserProfileSchema>

// to update kapag may iba na binatong payload, sa ngayon username palang ang na-eedit TODO
export const ChangeUserProfileSchema = z.object({
    newUsername: z.string()
        .min(3, { message: "Minimum length of username is 3" })
        .max(20, { message: "Maximum length of username is 20" })
})