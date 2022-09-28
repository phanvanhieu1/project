import { Module } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { PitchController } from './pitch.controller';

@Module({
  controllers: [PitchController],
  providers: [PitchService]
})
export class PitchModule {}
