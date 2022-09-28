import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import authConstants from '../auth-constants'

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface'
import UserEntity from '../entities/auth.entity'

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.jwt.secrets.accessToken,
    })
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      id: payload._id,
      role: payload.role,
        email: payload.email,
    }
  }
}
