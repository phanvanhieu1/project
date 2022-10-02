import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export default class UserRespository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  public async findUser(id: any): Promise<User> {
    const data =await this.userModel.findById(id);
    console.log(data);
    return data;
  }

  public async checkUser(data: string): Promise<any> {
    return await this.userModel.findOne({ email: data });
  }

  public async create(user: any): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }
}
