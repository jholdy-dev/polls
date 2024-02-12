import { z } from 'zod'

export const loginRequestSchema = z.object({
  password: z.string().min(10).max(10),
  cpf: z.string().max(11).min(11),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
