import { z } from 'zod'

export const updateQuizDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type UpdateQuizDto = z.infer<typeof updateQuizDtoSchema>
