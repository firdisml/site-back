import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessPayloadType } from '../type';

export const AccessTokenDecorator = createParamDecorator(
  (data: keyof AccessPayloadType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
