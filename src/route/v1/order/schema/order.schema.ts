import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { StatusEnum } from 'src/util/enum/status.enum'
import { StatusOrderEnum } from 'src/util/enum/statusOrder.enum'


@Schema({ timestamps: true })
export class Order {

  @Prop({
    required: true,
    type: String,
    ref: 'Pitch',
  })
  idPitch: string = ''

  @Prop({
    required: true,
    type: String,
    ref: 'User',
  })
  idUser: string = ''

  @Prop({
    required: true,
    type: Date,
  })
  timeStart: Date

  @Prop({
    required: true,
    type: String
  })
  totalTime: string = ''

  @Prop({
    required: false,
    type: Date,
  })
  timeEnd: Date

  @Prop({
    required: false,
    type: String,
  })
  totalPrice: string = ''

  @Prop({
    type: String,
  })
  note: string = ''

    @Prop({
    type: String,
    default: StatusOrderEnum.AWAIT
  })
  status: StatusEnum

  
}

export type OrderDocument = Order & Document

export const OrderSchema = SchemaFactory.createForClass(Order)