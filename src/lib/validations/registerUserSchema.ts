import { z } from "zod";

export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
    email: z.string().email().refine(email => email.length <= 255, { message: "Email is too long" }),
    password: z.string()
        .min(8, { message: "Minimum password length is 8 characters" })
        .max(20, { message: "Maximum password length is 20 characters" })
        .refine(password => {
            // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
            return passwordPattern.test(password)
        }, { message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character." }),
    confirmPassword: z.string().min(8, { message: "Password does not match" }),
    birthday: z.coerce.date({
        required_error: "A date of birth is required",
    })
        .refine((value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();

            if (age < 13) {
                throw new Error("You must be 13 years or older to register. For more information, make sure you've read our terms and conditions")
            }

            return true;
        }, {
            message: "You must be 13 years or older to register. For more information, make sure you've read our terms and conditions",
        }),
    community: z.string(),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
})