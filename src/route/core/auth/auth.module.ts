import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import AuthRepository from './auth.repository';
import JwtWSAccessStrategy from './strategies/jwt-ws-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import UserRespository from '../user/user.repository';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
    }),
  ],
  providers: [
    AuthService,
    JwtAccessStrategy,
    // JwtRefreshStrategy,
    AuthRepository,
    JwtWSAccessStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
