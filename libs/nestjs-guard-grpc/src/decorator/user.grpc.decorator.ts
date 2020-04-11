import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GRPCUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToRpc().getContext().req.user;
});

// @Query(returns => User)
// @UseGuards(GqlAuthGuard)
// whoAmI(@GRPCUser() user: User) {
//   return this.userService.findById(user.id);
// }
