import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/route/v1/order/schema/order.schema';
import { Pitch, PitchDocument } from 'src/route/v1/pitch/schemas/pitch.schema';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';


@Injectable()
export default class UserRespository {
  constructor(
    @InjectModel(Pitch.name) private pitchModel: Model<PitchDocument>,
  ) {}

  public async orderPitch(data: any): Promise<any> {
    console.log('data trong order repo',data);
  }
}
