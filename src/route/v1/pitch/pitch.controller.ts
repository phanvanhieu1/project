import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { UpdatePitchDto } from './dto/update-pitch.dto';
import CreatePitchDto from './dto/create-pitch.dto';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';
import { AdminGuard } from 'src/util/guard/admin.guard';
import { RequestExpress } from 'src/util/interface/exception-response.interface';
import ResponseUtils from 'src/util/response/response.utils';
import { Types } from 'mongoose';


@Controller()
export class PitchController {
  constructor(private readonly pitchService: PitchService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
  async create(@Body() createPitchDto: CreatePitchDto) {
    const data =await this.pitchService.create(createPitchDto);
    return ResponseUtils.success(data);
  }

  @Get()
  async findAll(@Req() req: RequestExpress) {
    const data = await this.pitchService.findAll(req.query);
    return ResponseUtils.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    const data = await this.pitchService.findOne(id);
    return ResponseUtils.success(data);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
  async update(@Param('id') id: any, @Body() updatePitchDto: UpdatePitchDto) {
    const data = await this.pitchService.update(id, updatePitchDto);
    return ResponseUtils.success(data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
  async remove(@Param('id') id: Types.ObjectId) {
    const data =await this.pitchService.remove(id);
    return ResponseUtils.success(data);
  }
}
