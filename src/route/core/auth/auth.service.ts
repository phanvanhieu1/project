import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import authConstants from './auth-constants';
import SignUpDto from './dto/sign-up.dto';
import { LoginPayload } from './interfaces/login-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: SignUpDto) {
    return await this.userService.create(data);
  }

  async createVerifyToken(id: Types.ObjectId):Promise<string> {
    return this.jwtService.sign(
      { id },
      {
        expiresIn: authConstants.jwt.expirationTime.accessToken,
        secret: authConstants.jwt.secrets.accessToken,
      },
    )
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
