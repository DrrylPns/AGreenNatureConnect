import { z } from 'zod'

export type CreateTopicType = z.infer<typeof TopicSchema>

export const TopicSchema = z.object({
    topicName: z.string().min(2, { message: "Minimum of 2 characters per topic is required!" }).max(21, { message: "Maximum of 21 characters per topic is required!" })
})