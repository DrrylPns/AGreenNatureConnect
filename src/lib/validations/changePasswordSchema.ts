import { z } from "zod"

export const ChangePasswordSchema = z.object({
    oldPassword: z.string()
        .min(8, { message: "Minimum password length is 8 characters" })
        .max(20, { message: "Maximum password length is 20 characters" }),
    newPassword: z.string()
        .min(8, { message: "Minimum password length is 8 characters" })
        .max(20, { message: "Maximum password length is 20 characters" })
        .refine(password => {
            // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
            return passwordPattern.test(password)
        }, { message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character." }),
    confirmNewPassword: z.string()
        .min(8, { message: "Minimum password length is 8 characters" })
        .max(20, { message: "Maximum password length is 20 characters" })
})