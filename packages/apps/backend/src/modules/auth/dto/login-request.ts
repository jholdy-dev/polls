import { loginRequestSchema } from '@lib/schema'
import { createZodDto } from 'nestjs-zod'

export class LoginRequestDto extends createZodDto(loginRequestSchema) {}
