import { z } from 'zod'

export const createAnswerDtoSchema = z.object({
  id: z.number().nullable(),
  description: z.string().min(5),
  questionId: z.number(),
})

export type CreateAnswerDto = z.infer<typeof createAnswerDtoSchema>
