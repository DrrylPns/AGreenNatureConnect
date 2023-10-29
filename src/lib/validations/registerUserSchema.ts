import { z } from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
    email: z.string().email().refine(email => email.length <= 255, { message: "Email is too long" }),
    password: z.string().min(8, { message: "Minimum password length is 8 characters" }).max(20, { message: "Maximum password length is 20 characters" }),
    confirmPassword: z.string().min(8, { message: "Password does not match" }),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
})