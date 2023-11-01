import { z } from 'zod'

export type CreateTopicType = z.infer<typeof TopicSchema>

export const TopicSchema = z.object({
    name: z.string().min(3, { message: "Minimum of 3 characters per topic is required!" }).max(21, { message: "Maximum of 21 characters per topic is required!" })
})