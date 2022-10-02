import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dto/sign-up.dto';
import ResponseUtils from 'src/util/response/response.utils';
import { RequestExpress } from 'src/util/interface/exception-response.interface';
import SignInDto from './dto/sign-in.dto';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import UserRespository from '../user/user.repository';
import { comparePassword } from 'src/util/hash/bcrypt';
import UserEntity from './entities/auth.entity';
import SignOutDto from './dto/sign-out.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRespository,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    const registerUser = await this.authService.register(data);
    const token = await this.authService.createVerifyToken(registerUser._id, registerUser.role);
    const rs = {
      accessToken: token,
      user: registerUser,
    };
    return ResponseUtils.success(rs);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDto): Promise<any | never> {
    const userDB = await this.userRepository.checkUser(body.email);
    if(userDB===null){
      throw new Error(ErrorThrowEnum.USER_NOT_FOUND);
    }
    const match = await comparePassword(body.password, userDB.password);
    if (!match) {
      throw new Error(ErrorThrowEnum.PASSWORD_NOT_MATCH);
    }
    const result = {
      accessToken: await this.authService.createVerifyToken(userDB._id, userDB.role),
      user: userDB,
    }
    return ResponseUtils.success(result)
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: forgotPasswordDto): Promise<any | never> {
    const userDB = await this.userRepository.checkUser(body.email);
    if(userDB===null){
      throw new Error(ErrorThrowEnum.EMAIL_ALREADY_EXISTS);
    }
    const token = await this.authService.createVerifyToken(userDB._id, userDB.role);
    const rs = {
      accessToken: token,
      user: userDB,
    };
    return ResponseUtils.success(rs);
  }
}
