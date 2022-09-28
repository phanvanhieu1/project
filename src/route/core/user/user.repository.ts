import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export default class UserRespository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async checkUser(data: string): Promise<any> {
    return this.userModel.findOne({
      $or: [{ email: { $in: data } }, { username: { $in: data } }],
    });
  }

  public async create(user: any): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }
}
