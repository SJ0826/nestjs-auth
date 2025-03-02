import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { ConfigType } from '@nestjs/config';
import { UserInfo } from '../users/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: UserInfo) {
    const payload = { ...user };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verify(jwtToken: string) {
    try {
      const payload = jwt.verify(jwtToken, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        UserInfo;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
