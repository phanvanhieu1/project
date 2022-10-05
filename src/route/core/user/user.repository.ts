import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/route/v1/order/schema/order.schema';
import { Pitch, PitchDocument } from 'src/route/v1/pitch/schemas/pitch.schema';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import { StatusOrderEnum } from 'src/util/enum/statusOrder.enum';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export default class UserRespository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Pitch.name) private pitchModel: Model<PitchDocument>,
  ) {}

  public async findUser(id: any): Promise<User> {
    const data = await this.userModel.findById(id);
    console.log(data);
    return data;
  }

  public async checkUser(data: string): Promise<any> {
    return await this.userModel.findOne({ email: data });
  }

  public async checkUserById(id: string): Promise<any> {
    const rs = await this.userModel.findById(id);
    return rs;
  }

  public async create(user: any): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  public async updatePassword(id: any, newPass: any): Promise<any> {
    const rs = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { password: newPass },
    );
    return rs;
  }

  public async orderPitch(user: any, data: any): Promise<any> {
    const checklist = await this.userModel.find({
      _id: user,
      await: { $in: [data.idPitch] },
    });
    const checkPitch = await this.pitchModel.find({ _id: data.idPitch });
    if (checklist.length > 0) {
      throw new Error(ErrorThrowEnum.PITCH_ALREADY_EXISTS_IN_LIST);
    }
    if (checkPitch.length === 0) {
      throw new Error(ErrorThrowEnum.PITCH_NOT_ALREADY_EXISTS);
    }
    const rs = await this.orderModel.create({ idUser: user, ...data });
    if (rs) {
      await this.userModel.findByIdAndUpdate(
        { _id: user },
        { $push: { await: rs.id } },
      );
    }
    return rs;
  }

  public async acceptPitch(data: any): Promise<any> {
    const checkOrder = await this.orderModel.find({ _id: data.idOrder });
    if (checkOrder.length === 0) {
      throw new Error(ErrorThrowEnum.ORDER_NOT_ALREADY_EXISTS);
    }
    const rs = await this.orderModel.findByIdAndUpdate(
      { _id: data.idOrder },
      { status: StatusOrderEnum.USING },
    );
    if (rs) {
      await this.userModel.findByIdAndUpdate(
        { _id: rs.idUser },
        { $pull: { await: rs.id } },
      );
      await this.userModel.findByIdAndUpdate(
        { _id: rs.idUser },
        { $push: { using: rs.id } },
      );
    }
    return rs;
  }

  public async findAllService(user: any, query: any): Promise<any> {
    let populate = query.status
    if (!query.status) {
      populate = 'AWAIT'
    }
    if (user.role === 'ADMIN') {
      const rs = await this.orderModel
        .find({ status: populate }).populate('idUser').populate('idPitch');
      return rs;
    }
    if (user.role === 'USER') {
      const rs = await this.orderModel
        .find({ idUser: user.id, status: populate }).populate('idUser').populate('idPitch');
      return rs;
    }
  }

  public async cancelPitch(body: any, id: any): Promise<any> {
    const idOrder = body.idOrder;
    const idUser = id.id;
    console.log(idUser);
    const checkUser = await this.userModel.find({ _id: idUser, await: { $in: [idOrder] } });
    if (checkUser.length === 0) {
      throw new Error('Đơn hàng này không phải của bạn, Bạn không có quyền hủy dịch vụ này');
    }
    const checkOrder = await this.orderModel.find({ _id: idOrder });
    if (checkOrder.length === 0) {
      throw new Error(ErrorThrowEnum.ORDER_NOT_ALREADY_EXISTS);
    }
    const rs = await this.orderModel.findByIdAndDelete({ _id: idOrder });
    if (rs) {
      await this.userModel.findByIdAndUpdate(
        { _id: idUser },
        { $pull: { await: rs.id } },
      );
    }
    return rs;
  }

  public async donePitch(body: any): Promise<any> {
    const checkOrder = await this.orderModel.find({ _id: body.idOrder });
    if (checkOrder.length === 0) {
      throw new Error(ErrorThrowEnum.ORDER_NOT_ALREADY_EXISTS);
    }
    const rs = await this.orderModel.findByIdAndUpdate({ _id: body.idOrder }, { status: StatusOrderEnum.HISTORY });
    if (rs) {
      await this.userModel.findByIdAndUpdate(
        { _id: rs.idUser },
        { $pull: { using: rs.id } },
      );
      await this.userModel.findByIdAndUpdate({
        _id: rs.idUser,
      },
      {
        $push: { history: rs.id },
      })
    }
    return rs;
  }
}
