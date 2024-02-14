import { z } from 'zod'
import { createAnswerDtoSchema } from './create-answer-dto'

export const answerQuizDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  questions: z.array(
    z.object({
      id: z.number().nullable(),
      description: z.string(),
      answer: createAnswerDtoSchema,
    }),
  ),
})

export type AnswerQuizDto = z.infer<typeof answerQuizDtoSchema>
