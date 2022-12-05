import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const StripeDecorator = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.headers;
    return request.headers[data];
  },
);
