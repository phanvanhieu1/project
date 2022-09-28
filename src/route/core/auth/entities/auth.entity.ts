import { Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { RoleUserEnum } from 'src/util/enum/role-user.enum'

export default class UserEntity {
  @ApiProperty({ type: String })
  _id: Types.ObjectId = new Types.ObjectId()

  @ApiProperty({ type: String })
  id: Types.ObjectId = new Types.ObjectId()

  @ApiProperty({ type: 'enum', enum: RoleUserEnum })
  role: RoleUserEnum = RoleUserEnum.USER

  @ApiProperty({ type: String })
  email: string = ''

  @ApiProperty({ type: String })
  phone: string = ''

  @ApiProperty({ type: String })
  password: string = ''

  @ApiProperty({ type: String })
  fullName: string = ''

  // @ApiProperty({ type: Boolean })
  // crossOwner: boolean = false
}
