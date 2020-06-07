import { createParamDecorator, ExecutionContext } from '@nestjs/common';
const camelcaseKeys = require('camelcase-keys');

export const GRPCUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return camelcaseKeys(context.switchToRpc().getContext().user);
});
