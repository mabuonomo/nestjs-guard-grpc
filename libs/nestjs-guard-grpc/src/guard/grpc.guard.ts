import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(@Inject('IAuthService') private authService: IAuthService) {}

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

    const user: IUser = await this.authService.verify(token);

    if (user === undefined) {
      return false;
    }

    request.user = user;

    return true;
  }
}
