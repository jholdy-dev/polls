import { createZodDto } from 'nestjs-zod'
import { answerQuizDtoSchema } from '@lib/schema'

export class AnswerQuizDto extends createZodDto(answerQuizDtoSchema) {}
