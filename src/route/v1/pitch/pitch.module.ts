import { Module } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { PitchController } from './pitch.controller';
import { Pitch } from './entities/pitch.entity';
import { PitchSchema } from './schemas/pitch.schema';
import { MongooseModule } from '@nestjs/mongoose';
import PitchRepository from './pitch.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pitch.name, schema: PitchSchema }])],
  controllers: [PitchController],
  providers: [PitchService, PitchRepository],
})
export class PitchModule {}
