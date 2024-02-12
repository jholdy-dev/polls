import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  password: z.string().min(10).max(10),
  cpf: z.string().max(11).min(11),
})

export type User = z.infer<typeof userSchema>
