"use server";

import { sendEmployeePasswordEmail } from "@/lib/mail";
import { generateEmployeePasswordToken } from "@/lib/tokens";
import { ResetSchema } from "@/lib/validations/changePasswordSchema";
import z from "zod";
import { getUserByEmail } from "../data/user";

export const sendEmployeePasswordLink = async (email: string) => {
    // const validatedFields = ResetSchema.safeParse(values);

    // if (!validatedFields.success) {
    //     return { error: "Invalid email!" };
    // }

    // const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generateEmployeePasswordToken(email);
    await sendEmployeePasswordEmail(
        passwordResetToken.email,
        passwordResetToken.token,
        existingUser.name,
    );

    return { success: "Reset email sent!" };
}