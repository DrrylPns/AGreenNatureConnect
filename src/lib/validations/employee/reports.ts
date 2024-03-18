import { z } from "zod"

export type handleReportType = z.infer<typeof handleReportSchema>

export const handleReportSchema = z.object({
    status: z.enum([
        "PENDING",
        "RESOLVED",
        "REJECTED",
    ]),
    postId: z.string().optional(),
    reporterId: z.string().optional(),
    reportedId: z.string().optional(),
    reportId: z.string().optional(),
})