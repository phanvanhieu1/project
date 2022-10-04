import { Injectable } from '@nestjs/common';
import UserRespository from 'src/route/core/user/user.repository';
import AcceptDto from './dto/accept.dto';
import  CreateServiceDto  from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly userRespository: UserRespository) {}
  async orderPitch(user: any,data: CreateServiceDto) {
    return await this.userRespository.orderPitch(user, data);
  }
  
  async acceptPitch(data: AcceptDto) {
    return await this.userRespository.acceptPitch(data);
  }

  async findAll(user: any,query: any) {
    return await this.userRespository.findAllService(user,query);
  }

  async cancelPitch(id:any, body: any ) {
    return await this.userRespository.cancelPitch(id, body);
  }

  async donePitch( data: any) {
    return await this.userRespository.donePitch(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
