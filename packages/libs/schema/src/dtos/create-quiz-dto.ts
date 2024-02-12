import { z } from 'zod'

export const createQuizDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.string(),
})

export type CreateQuizDto = z.infer<typeof createQuizDtoSchema>
