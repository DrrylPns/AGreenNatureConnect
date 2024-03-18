import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Agreenatureconnect: Reset your password",
        html: `<div>
                    <p>Click <a href="${resetLink}">here</a> to reset password.</p>
                    <p>Note: This link is only valid for 1 hour.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Agreenatureconnect: Confirm your email.",
        html: `<div>
                <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
                <p>Note: This link is only valid for 1 hour.</p>
                <b>-Agreenatureconnect</b>
        </div>`
    })
}