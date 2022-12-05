import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { AccessPayloadType } from '../type';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor() {
    super({
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const access_token = request?.cookies['access_token'];
          if (!access_token) {
            return null;
          }
          return access_token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: AccessPayloadType) {
    if (!payload) {
      throw new BadRequestException('Invalid JWT token');
    }
    const data = req?.cookies['access_token'];

    if (!data) {
      throw new BadRequestException('Invalid JWT token!');
    }

    return {
      ...payload,
    };
  }
}
