import { z } from 'zod'

export const createAnswerDtoSchema = z.object({
  description: z.string(),
  questionId: z.string(),
})

export type CreateAnswerDto = z.infer<typeof createAnswerDtoSchema>
