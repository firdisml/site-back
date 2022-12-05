import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { RefreshPayloadType } from '../type';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['refresh_token'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(req: Request, payload: RefreshPayloadType) {
    if (!payload) {
      throw new BadRequestException('Invalid JWT token');
    }

    const data = req?.cookies['refresh_token'];

    if (!data) {
      throw new BadRequestException('Invalid JWT token!');
    }

    return {
      ...payload,
      refresh_token: data,
    };
  }
}
