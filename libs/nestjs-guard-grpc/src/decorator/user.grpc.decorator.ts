import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GRPCUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToRpc().getContext().user;
});
