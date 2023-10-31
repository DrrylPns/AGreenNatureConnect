import { z } from "zod"

export type LoginType = z.infer<typeof LoginSchema>

export const LoginSchema = z.object({
    email: z.string().email().refine(email => email.length <= 255, { message: "Email is too long" }),
    password: z.string().min(8, { message: "Minimum password length is 8 characters" }).max(20, { message: "Maximum password length is 20 characters" }),
})