import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import updatePassWordDto from './dto/update-user.dto';
import { Request } from 'express';
import { RequestExpress } from 'src/util/interface/exception-response.interface';
import { UserGuard } from 'src/util/guard/user.guard';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update-password')
  @UseGuards(UserGuard)
  @UseGuards(AuthenticationGuard)
  async updatePassword(@Req() req:RequestExpress, @Body() body: updatePassWordDto) {
    const id = req.user.id;
    return await this.userService.updatePassword(id, body);
  }

  @Get()
  findAll(@Req() req: Request) {
    const id = req.user;
    return this.userService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
