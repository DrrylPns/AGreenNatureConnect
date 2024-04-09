import { CancelType } from "@prisma/client";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendEmployeePasswordEmail = async (email: string, token: string, name: string | null) => {
    const resetLink = `${domain}/set-password?token=${token}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Hi, ${name}. Please set your password`,
        html: `<div>
                    <p>Click <a href="${resetLink}">here</a> to reset password.</p>
                    <p>Note: This link is only valid for 1 hour.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendCancelledNotification = async (email: string, transactionId: string, communityName: string, cancelReason: string | null, cancelType: CancelType | null) => {
    const tradeLink = `${domain}/order-status/${transactionId}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Your order from ${communityName} was cancelled.`,
        html: `<div>
                    <p>Reason: ${cancelType}</p>
                    <p>${cancelReason}</p>
                    <p>Click <a href="${tradeLink}">here</a> to see your order receipt.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendCompletedNotification = async (email: string, transactionId: string, communityName: string) => {
    const tradeLink = `${domain}/order-status/${transactionId}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Your order from ${communityName} is completed.`,
        html: `<div>
                    <p>Click <a href="${tradeLink}">here</a> to see your order receipt.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendPickUpNotification = async (email: string, transactionId: string, communityName: string) => {
    const tradeLink = `${domain}/order-status/${transactionId}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Your order from ${communityName} has been picked up.`,
        html: `<div>
                    <p>Click <a href="${tradeLink}">here</a> to see your order receipt.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendApprovedNotification = async (email: string, transactionId: string, communityName: string) => {
    const tradeLink = `${domain}/order-status/${transactionId}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Your order from ${communityName} has been accepted.`,
        html: `<div>
                    <p>Click <a href="${tradeLink}">here</a> to see your order receipt.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendPendingOrderNotification = async (email: string, transactionId: string, communityName: string) => {
    const tradeLink = `${domain}/order-status/${transactionId}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: `Agreenatureconnect: Your order from ${communityName} has been issued.`,
        html: `<div>
                    <p>Click <a href="${tradeLink}">here</a> to see your order receipt.</p>
                    <b>-Agreenatureconnect</b>
                </div>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/new-password?token=${token}`

    await resend.emails.send({
        from: "agreennatureconnect@agreennatureconnect.online",
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
        from: "agreennatureconnect@agreennatureconnect.online",
        to: email,
        subject: "Agreenatureconnect: Confirm your email.",
        html: `<div>
                <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
                <p>Note: This link is only valid for 1 hour.</p>
                <b>-Agreenatureconnect</b>
        </div>`
    })
}