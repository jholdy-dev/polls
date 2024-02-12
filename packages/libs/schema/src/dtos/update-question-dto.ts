import { z } from 'zod'

export const updateQuestionDtoSchema = z.object({
  description: z.string(),
})

export type UpdateQuestionDto = z.infer<typeof updateQuestionDtoSchema>
