import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { RoleUserEnum } from 'src/util/enum/role-user.enum'


@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    default: RoleUserEnum.USER,
  })
  role: RoleUserEnum

  @Prop({
    type: String,
    trim: true,
    minlength: 6,
  })
  username: string = ''

  @Prop({
    type: String,
    trim: true,
    minlength: 6,
  })
  email: string = ''

  @Prop({
    type: String,
    trim: true,
    minlength: 8,
  })
  phone: string = ''

  @Prop({
    required: true,
    type: String,
  })
  password: string = ''

  @Prop({
    type: String,
    trim: true,
  })
  fullName: string = ''

//   @Prop({
//     type: MongooseSchema.Types.ObjectId,
//     ref: FileManager.name,
//     customPopulate: {
//       path: 'avatar',
//     },
//   })
//   avatar?: FileManager
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)