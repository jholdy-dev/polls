import { z } from 'zod'

export const createQuizDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.number(),
  questions: z.array(
    z.object({
      description: z.string(),
    }),
  ),
})

export type CreateQuizDto = z.infer<typeof createQuizDtoSchema>
