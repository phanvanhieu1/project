import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import UserRespository from './user.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRespository],
  exports: [UserService, UserRespository]
})
export class UserModule {}
