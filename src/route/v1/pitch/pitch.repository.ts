import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pitch, PitchDocument } from './schemas/pitch.schema';

@Injectable()
export default class PitchRepository {
  constructor(@InjectModel(Pitch.name) private pitchModel: Model<PitchDocument>) {}

  async createPitch(pitch: any): Promise<any> {
    const createdPitch = await this.pitchModel.create(pitch);
    return createdPitch;
  }
}
