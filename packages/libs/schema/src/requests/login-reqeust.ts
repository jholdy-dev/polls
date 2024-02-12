import { z } from 'zod'

export const loginRequestSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(80)
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])/,
      'The password must contain numbers and special characters.',
    ),
  cpf: z.string(),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
