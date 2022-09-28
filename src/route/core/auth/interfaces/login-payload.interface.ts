import { Types } from 'mongoose'

export interface LoginPayload {
  readonly _id?: Types.ObjectId

  readonly id?: Types.ObjectId

  readonly role: string

    readonly email: string

}
