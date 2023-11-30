import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string()
})

export type Address = z.infer<typeof addressSchema>
