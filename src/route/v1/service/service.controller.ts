import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ServiceService } from './service.service';
import  CreateServiceDto  from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';
import { UserGuard } from 'src/util/guard/user.guard';
import { RequestExpress } from 'src/util/interface/exception-response.interface';
import ResponseUtils from 'src/util/response/response.utils';
import AcceptDto from './dto/accept.dto';
import { AdminGuard } from 'src/util/guard/admin.guard';

@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('order-pitch')
  @UseGuards(UserGuard)
  @UseGuards(AuthenticationGuard)
  async order(@Body() data: CreateServiceDto, @Req() req: RequestExpress) {
    const user = req.user.id;
    const rs =await this.serviceService.orderPitch(user, data);
    return ResponseUtils.success(rs);
  }

  @Post('accept-pitch')
  @UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
  async accept(@Body() data: AcceptDto, @Req() req: RequestExpress) {
    const rs =await this.serviceService.acceptPitch(data);
    return ResponseUtils.success(rs);
  }

  @Post('done-pitch')
  @UseGuards(AdminGuard)
  @UseGuards(AuthenticationGuard)
  async done(@Body() data: AcceptDto, @Req() req: RequestExpress) {
    const rs =await this.serviceService.donePitch(data);
    return ResponseUtils.success(rs);
  }

 

  @Post('order-list')
  @UseGuards(UserGuard)
  @UseGuards(AuthenticationGuard)
  async cancelPitch(@Req() req: RequestExpress) {
    const user = req.user;
    const data = await this.serviceService.cancelPitch(req.body,user);
    return ResponseUtils.success(data);
  }

  @Get('order-list')
  @UseGuards(AuthenticationGuard)
  async findAll(@Req() req: RequestExpress) {
    const user = req.user;
    const data = await this.serviceService.findAll(user,req.query);
    return ResponseUtils.success(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
