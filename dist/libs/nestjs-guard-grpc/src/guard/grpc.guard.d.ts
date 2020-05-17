import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthServiceInterface } from '../interfaces/auth.interface';
export declare class GrpcAuthGuard implements CanActivate {
    private authService;
    constructor(authService: AuthServiceInterface);
    getRequest(context: ExecutionContext): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
