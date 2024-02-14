import { z } from 'zod'

export const updateQuizDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  questions: z.array(
    z.object({
      id: z.number().nullable(),
      description: z.string(),
    }),
  ),
})

export type UpdateQuizDto = z.infer<typeof updateQuizDtoSchema>
