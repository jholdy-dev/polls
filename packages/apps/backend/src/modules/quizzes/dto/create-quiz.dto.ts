import { createZodDto } from 'nestjs-zod'
import { createQuizDtoSchema } from '@lib/schema'

export class CreateQuizDto extends createZodDto(createQuizDtoSchema) {}
