import { z } from "zod";

export type ChangeGenderType = z.infer<typeof ChangeGenderSchema>

export const ChangeGenderSchema = z.object({
    gender: z.enum(["MALE", "FEMALE", "OTHER"])
});