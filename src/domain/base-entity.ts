export interface IBaseEntityStatic {
  new (...args: any[]): any
  fromObject (data: Record<string, unknown>): InstanceType<this>
}

export interface IBaseEntity {
  id: string
  toJSON(): string
  toObject(): Record<string, unknown>
}
