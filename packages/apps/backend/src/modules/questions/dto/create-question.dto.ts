import { createZodDto } from 'nestjs-zod'
import { createQuestionDtoSchema } from '@lib/schema'

export class CreateQuestionDto extends createZodDto(createQuestionDtoSchema) {}
