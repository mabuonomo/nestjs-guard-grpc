import { CanActivate, ExecutionContext } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.interface';
export declare class GrpcAuthGuard implements CanActivate {
    private authService;
    constructor(authService: IAuthService);
    getRequest(context: ExecutionContext): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
