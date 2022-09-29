import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { StatusEnum } from 'src/util/enum/status.enum'


@Schema({ timestamps: true })
export class Pitch {

  @Prop({
    required: true,
    type: String,
  })
  name: string = ''

  @Prop({
    required: true,
    type: String,
  })
  type: string = ''

    @Prop({
    type: String,
    default: StatusEnum.EMPTY,
  })
  status: StatusEnum

  @Prop({
    required: true,
    type: String,
  })
  price: string = ''

  @Prop({
    type: String,
    default: ''
  })
  assign: string = ''

  @Prop({
    type: String,
  })
  note: string = ''
}

export type PitchDocument = Pitch & Document

export const PitchSchema = SchemaFactory.createForClass(Pitch)