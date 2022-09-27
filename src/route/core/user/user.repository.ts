
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schemas";




@Injectable()
export default class UserRespository {
constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
}
}