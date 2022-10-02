import { Injectable } from '@nestjs/common';
import CreatePitchDto from './dto/create-pitch.dto';
import PitchRepository from './pitch.repository';
import { UpdatePitchDto } from './dto/update-pitch.dto';

@Injectable()
export class PitchService {
  constructor(
    private readonly pitchRepository: PitchRepository,
  ) {}


  async create(createPitchDto: CreatePitchDto): Promise<any> {
    return await this.pitchRepository.createPitch(createPitchDto);
  }

  async findAll(query: any): Promise<any> {
    return await this.pitchRepository.findAll(query);
  }

  async findOne(id: any) {
    return await this.pitchRepository.findOne(id);
  }

  async update(id: any, updatePitchDto: UpdatePitchDto) {
    return await this.pitchRepository.update(id, updatePitchDto);
  }

  async remove(id: any) {
    return await this.pitchRepository.remove(id);
  }
}
