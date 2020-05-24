import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthServiceInterface } from '../interfaces/auth.interface';
import { UserInterface } from '../interfaces/user.interface';

// https://github.com/nestjs/passport/blob/6d9c71fa04e5c16480ba0b7e7671e43918dd9ff4/lib/auth.guard.ts
@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(@Inject('AUTHSERVICE') private authService: AuthServiceInterface) {}

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const type = context.getType();
    const prefix = 'Bearer ';

    let header: any;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1);
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      return false;
    }

    const token = header.slice(header.indexOf(' ') + 1);

    const user: UserInterface = await this.authService.verify(token);

    if (user === undefined) {
      return false;
    }

    request.user = user;

    return true;
  }
}
