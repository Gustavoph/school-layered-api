import { z } from 'zod'
import { addressSchema } from './types.js'
import { randomUUID } from 'crypto'
import { IBaseEntity } from './base-entity.js'

export const parentCreationSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  phones: z.array(z.string()).nonempty(),
  emails: z.array(z.string()).nonempty(),
  address: z.array(addressSchema),
  id: z.string().uuid().optional(),
})

export type ParentCreationType = z.infer<typeof parentCreationSchema>

export class Parent implements IBaseEntity {
  firstName: ParentCreationType['firstName']
  surname: ParentCreationType['surname']
  phones: ParentCreationType['phones']
  emails: ParentCreationType['emails']
  address: ParentCreationType['address']
  readonly id: string

  constructor(data: ParentCreationType) {
    const parsed = parentCreationSchema.parse(data)
    this.firstName = parsed.firstName
    this.surname = parsed.surname
    this.phones = parsed.phones
    this.emails = parsed.emails
    this.address = parsed.address
    this.id = parsed.id ?? randomUUID()
  }

  static fromObject (data: Record<string, unknown>) {
    const parsed = parentCreationSchema.parse(data)
    return new Parent(parsed)
  }

  toJSON() {
    return JSON.stringify(this.toObject())
  }

  toObject () {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      phones: this.phones,
      emails: this.emails,
      address: this.address
    }
  }
}
