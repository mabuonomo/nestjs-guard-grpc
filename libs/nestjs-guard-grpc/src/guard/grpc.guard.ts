import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInterface } from '../interfaces/auth.interface';

// https://github.com/nestjs/passport/blob/6d9c71fa04e5c16480ba0b7e7671e43918dd9ff4/lib/auth.guard.ts
export class GrpcAuthGuard implements CanActivate {
  constructor(private authService: AuthServiceInterface) {}

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const type = context.getType();
    const prefix = 'Bearer ';
    let header;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1); // metadata // .SWITCHTORCP
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      return false;
    }

    const token = header.slice(header.indexOf(' ') + 1);
    const user = this.authService.verify(token);

    if (user === undefined) {
      return false;
    }

    request.user = user;

    return true;
  }
}
