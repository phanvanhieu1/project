import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import { pageNum } from 'src/util/enum/varialGlobal';
import { Pitch, PitchDocument } from './schemas/pitch.schema';

@Injectable()
export default class PitchRepository {
  constructor(@InjectModel(Pitch.name) private pitchModel: Model<PitchDocument>) {}

  async createPitch(pitch: any): Promise<any> {
    const createdPitch = await this.pitchModel.create(pitch);
    return createdPitch;
  }

  async findAll(query:any): Promise<any> {
    return await this.pitchModel.find().skip(query.page * pageNum).limit(pageNum);
  }

  async findOne(id: any): Promise<any> {
    return await this.pitchModel.findById(id);
  }

  async update(id: any, pitch: any): Promise<any> {
    const check = await this.pitchModel.findById(id);
    if(!check) {
      throw new Error(ErrorThrowEnum.PITCH_ALREADY_EXISTS);
    }
    return await this.pitchModel.findByIdAndUpdate(id, pitch);
  }

  async remove(id: any): Promise<any> {
    const check = await this.pitchModel.findById(id);
    if(!check) {
      throw new Error(ErrorThrowEnum.PITCH_ALREADY_EXISTS);
    }
    return await this.pitchModel.findByIdAndDelete(id);
  }
}
