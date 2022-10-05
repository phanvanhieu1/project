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
  Res,
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
import { changePasswordDto } from './dto/change-password.dto';
import nodemailer from 'nodemailer';
import {Response} from 'express';

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
  async signIn(@Body() body: SignInDto, @Res({passthrough: true}) res: Response): Promise<any | never> {
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
    res.cookie('Authorization', result.accessToken, { secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'none',
  });

    return ResponseUtils.success(result)
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: forgotPasswordDto): Promise<any | never> {
    const checkUser = await this.userRepository.checkUser(body.email);
    if(checkUser===null){
      throw new Error(ErrorThrowEnum.USER_NOT_FOUND);
    }
    const sendMail =await this.authService.sendMail(body.email);
    console.log(sendMail);
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'thienphuc04072001@gmail.com',
    //     pass: 'bprhhmixzifkzozs'
    //   }
    // });
    // console.log(transporter);
    // const mailOptions = {
    //   from: body.email,
    //   to: 'thienphuc04072001@gmail.com',
    //   subject: `[ ${body.email} ] đã yêu cầu đổi mật khẩu ]`,
    //   text: `Yêu cầu cấp lại mật khẩu cho email ${body.email}`
    // }
    // const mailOptions1 = {
    //   from: 'thienphuc04072001@gmail.com',
    //   to: body.email,
    //   subject: `Xin chào ${body.email} !`,
    //   text: 'Mã xác nhận của bạn là: 123456'
    // }
    // await transporter.sendMail(mailOptions, (err: any, data: any) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Email sent!!!');
    //   }
    // });
    // await transporter.sendMail(mailOptions1, (err: any, data: any) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Email sent!!!');
    //   }
    // });
    return ResponseUtils.success(checkUser);
  }
}
