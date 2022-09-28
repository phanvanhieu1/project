import { Test, TestingModule } from '@nestjs/testing';
import { PitchController } from './pitch.controller';
import { PitchService } from './pitch.service';

describe('PitchController', () => {
  let controller: PitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PitchController],
      providers: [PitchService],
    }).compile();

    controller = module.get<PitchController>(PitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
