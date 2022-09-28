import { Types } from 'mongoose'
import { RoleUserEnum } from 'src/util/enum/role-user.enum'

export interface JwtStrategyValidate {
  _id: Types.ObjectId
  id: Types.ObjectId
  role: RoleUserEnum
  email: string
}
