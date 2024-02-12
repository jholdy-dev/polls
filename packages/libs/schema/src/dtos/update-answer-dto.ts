import { z } from 'zod'

export const updateAnswerDtoSchema = z.object({
  description: z.string(),
  questionId: z.string(),
})

export type UpdateAnswerDto = z.infer<typeof updateAnswerDtoSchema>
