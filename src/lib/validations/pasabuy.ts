import { z } from "zod";

export type PasabuyType = z.infer<typeof PasabuySchema>

export const PasabuySchema = z.object({

    form: z.optional(z.string()),
  
    urbanFarmName: z.string({
        required_error: "Urban farm name required!"
    }),
    area: z.string({
        required_error: "Urban farm name required!"
    }),
    communityAddress: z.string({
        required_error: "Urban farm address required!"
    }),
 
    email: z.string({
        required_error: "Admin email required!"
    }).email().refine(email => email.length <= 255, { message: "Admin Email is too long" }),
    firstname: z.string().min(3, { message: "Admin Name is too short." }).max(50, { message: "Admin Name is too long" }),
    lastName: z.string().min(3, { message: "Admin Lastname is too short." }).max(50, { message: "Admin Lastname is too long" }),
 
    gender: z.string({
        required_error: "Please select a valid gender."
    }),
    userPhone: z.string()
        .refine(phone => {
            const phMobilePattern = /^(09\d{9})$/;
            return phMobilePattern.test(phone)
        }),
  
    blk: z.string({
        required_error: "Blk / House # is required"
    }),
    street: z.string({
        required_error: "Street address is required"
    }),
    zip: z.string().min(4, { message: "Invalid zip code." }).max(4, { message: "Invalid zip code." }),
})

export type ConsignorType = z.infer<typeof ConsignorSchema>

export const ConsignorSchema = z.object({
    
    urbanFarmId: z.string({
        required_error: "Urban farm name required!"
    }),
    products: z.string({
        required_error: "Urban farm name required!"
    }),
    description: z.string({
        required_error: "Urban farm name required!"
    }),
   
})
