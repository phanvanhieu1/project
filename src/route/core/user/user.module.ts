import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import UserRespository from './user.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schemas';
import { Order, OrderSchema } from 'src/route/v1/order/schema/order.schema';
import { Pitch, PitchSchema } from 'src/route/v1/pitch/schemas/pitch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Pitch.name, schema: PitchSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRespository],
  exports: [UserService, UserRespository],
})
export class UserModule {}
