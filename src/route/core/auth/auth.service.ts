import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import authConstants from './auth-constants';
import SignUpDto from './dto/sign-up.dto';
import { LoginPayload } from './interfaces/login-payload.interface';
import * as jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import AuthRepository from './auth.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
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

async sendMail(email: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter =await this.authRepository.a();
console.log(transporter);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" thienphuc04072001@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
}
