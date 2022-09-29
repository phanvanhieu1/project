import { Injectable } from '@nestjs/common';
import CreatePitchDto from './dto/create-pitch.dto';
import PitchRepository from './pitch.repository';
import { UpdatePitchDto } from './dto/update-pitch.dto';

@Injectable()
export class PitchService {
  constructor(
    private readonly pitchRepository: PitchRepository,
  ) {}


  create(createPitchDto: CreatePitchDto) {
    return this.pitchRepository.createPitch(createPitchDto);
  }

  findAll() {
    return `This action returns all pitch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pitch`;
  }

  update(id: number, updatePitchDto: UpdatePitchDto) {
    return `This action updates a #${id} pitch`;
  }

  remove(id: number) {
    return `This action removes a #${id} pitch`;
  }
}
