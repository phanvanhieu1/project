import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { StatusEnum } from 'src/util/enum/status.enum'
import { StatusEmployeeEnum } from 'src/util/enum/statusEmployee.enum'


@Schema({ timestamps: true })
export class Employee {

  @Prop({
    required: true,
    type: String,
  })
  name: string = ''

    @Prop({
    type: String,
    default: StatusEmployeeEnum.ON,
  })
  status: StatusEmployeeEnum

  @Prop({
    required: true,
    type: String,
  })
  phone: string 

  @Prop({
    required: true,
    type: String,
  })
  address: string

  @Prop({
    required: true,
    type: String,
  })
  email: string

  @Prop({
    required: true,
    type: String,
  })
  note: string = ''

  @Prop({
   type: Boolean,
    default: false,
  })
  isDeleted: boolean
}

export type EmployeeDocument = Employee & Document

export const EmployeeSchema = SchemaFactory.createForClass(Employee)