import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshPayloadType } from '../type/refresh.payload.type';

export const RefreshTokenDecorator = createParamDecorator(
  (data: keyof RefreshPayloadType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
