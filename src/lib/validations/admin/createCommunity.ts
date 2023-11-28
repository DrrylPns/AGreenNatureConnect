import { z } from "zod";

export type CommunityType = z.infer<typeof CommunitySchema>

export const CommunitySchema = z.object({
    users: z.string({
        required_error: "Please select a community master.",
    }),
    name: z.string().min(3, { message: "Name is too short." }).max(30, { message: "Name is too long." })
});