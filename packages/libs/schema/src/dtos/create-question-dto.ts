import { z } from 'zod'

export const createQuestionDtoSchema = z.object({
  description: z.string(),
  quizId: z.number(),
})

export type CreateQuestionDto = z.infer<typeof createQuestionDtoSchema>
