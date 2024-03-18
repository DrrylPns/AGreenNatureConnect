import { z } from "zod";

export type ReportType = z.infer<typeof ReportSchema>

export const ReportSchema = z.object({
    type: z.enum(["IntellectualProperty", "FraudOrScam", "MockingVictims", "Bullying", "ChildAbuse", "AnimalAbuse", "SexualActivity", "SuicideOrSelfInjury", "HateSpeech", "PromotingDrugUse", "NonConsensualIntimateImages", "SexualExploitation", "Harassment", "UnauthorizedSales", "Violence", "SharingPrivateImages", "IrrelevantContent"], {
        required_error: "You need to select a reason for cancelling.",
    }),
    postId: z.string().optional(),
    posterId: z.string().optional(),
})