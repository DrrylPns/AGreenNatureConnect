import { z } from "zod"

export const ReactionType = z.enum(['Check', 'Leaf', 'XMark', 'Laugh']);

export const CreateReactionSchema = z.object({
    postId: z.string(),
    type: ReactionType,
});

export type CreateReactionType = z.infer<typeof CreateReactionSchema>;