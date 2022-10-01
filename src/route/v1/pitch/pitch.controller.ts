import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { UpdatePitchDto } from './dto/update-pitch.dto';
import CreatePitchDto from './dto/create-pitch.dto';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';

@Controller()
@UseGuards(AuthenticationGuard)
export class PitchController {
  constructor(private readonly pitchService: PitchService) {}

  @Post()
  create(@Body() createPitchDto: CreatePitchDto) {
    return this.pitchService.create(createPitchDto);
  }

  @Get()
  findAll() {
    return this.pitchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePitchDto: UpdatePitchDto) {
    return this.pitchService.update(+id, updatePitchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pitchService.remove(+id);
  }
}
