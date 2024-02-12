import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  password: z
    .string()
    .min(8)
    .max(8)
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])/,
      'The password must contain numbers and special characters.',
    ),
  cpf: z.string(),
})

export type User = z.infer<typeof userSchema>
