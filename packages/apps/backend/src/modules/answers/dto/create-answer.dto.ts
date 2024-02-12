import { createAnswerDtoSchema } from '@lib/schema'
import { createZodDto } from 'nestjs-zod'

export class CreateAnswerDto extends createZodDto(createAnswerDtoSchema) {}
