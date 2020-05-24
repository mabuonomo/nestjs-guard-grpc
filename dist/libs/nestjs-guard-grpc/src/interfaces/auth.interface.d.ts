import { IUser } from './user.interface';
export interface IAuthService {
    verify(params: any): Promise<IUser> | undefined | any;
}
