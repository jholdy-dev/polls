import { userSchema } from '@lib/schema'
import { createZodDto } from 'nestjs-zod'

export class UserDto extends createZodDto(userSchema) {}
