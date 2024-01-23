import { z } from "zod";

export type UpdateEmployeeType = z.infer<typeof UpdateEmployeeSchema>

export const UpdateEmployeeSchema = z.object({
    employeeId: z.string(),
    avatar: z.string({
        required_error: "Please select an image."
    }).optional(),
    firstname: z.string().min(3, { message: "Name is too short." }).max(50, { message: "Name is too long" }),
    lastName: z.string().min(3, { message: "Lastname is too short." }).max(50, { message: "Lastname is too long" }),
    phone: z.string()
        .refine(phone => {
            const phMobilePattern = /^(09\d{9})$/;
            return phMobilePattern.test(phone)
        }),
    gender: z.string({
        required_error: "Please select a valid gender."
    }).optional(),
    // email: z.string().email().refine(email => email.length <= 255, { message: "Email is too long" }),
    address: z.string()
        .min(5, { message: "Minimum length of address is 5" })
        .max(100, { message: "Maximum length of address is 100" }),
    // password: z.string()
    //     .min(8, { message: "Minimum password length is 8 characters" })
    //     .max(20, { message: "Maximum password length is 20 characters" })
    //     .refine(password => {
    //         // reg-ex code, chat gpt generated: at least one lowercase letter, one uppercase letter, and one special character
    //         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;
    //         return passwordPattern.test(password)
    //     }, { message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character." }),
    // confirmPassword: z.string().min(8, { message: "Password does not match" }),
})
// .refine(data => data.password === data.confirmPassword, {
//     message: "Password does not match",
//     path: ["confirmPassword"],
// });