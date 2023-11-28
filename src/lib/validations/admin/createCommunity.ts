import { z } from "zod";

export type CommunityType = z.infer<typeof CommunitySchema>

export const CommunitySchema = z.object({
    // users: z.string({
    //     required_error: "Please select a community master.",
    // }),
    email: z.string().email().refine(email => email.length <= 255, { message: "Email is too long" }),
    name: z.string().min(3, {message: "Name is too short."}).max(50, { message: "Name is too long"}),
    middleName: z.string().min(3, {message: "Middlename is too short."}).max(50, { message: "Middlename is too long"}),
    lastName: z.string().min(3, {message: "Lastname is too short."}).max(50, { message: "Lastname is too long"}),
    communityName: z.string().min(3, { message: "Community name is too short." }).max(30, { message: "Community name is too long." })
});