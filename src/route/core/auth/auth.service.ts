import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import authConstants from './auth-constants';
import SignUpDto from './dto/sign-up.dto';
import { LoginPayload } from './interfaces/login-payload.interface';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: SignUpDto) {
    return await this.userService.create(data);
  }

  async createVerifyToken(id: Types.ObjectId, role: any):Promise<string> {
    return jwt.sign({
      id: id,
      role: role,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
  }

  async login(data: LoginPayload): Promise<string> {
    const payload: LoginPayload = {
      _id: data._id,
      id: data._id,
      role: data.role,
      email: data.email,
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secrets.accessToken,
    })
    return accessToken


}
}
