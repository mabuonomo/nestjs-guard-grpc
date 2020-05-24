import { UserInterface } from './user.interface';
export interface AuthServiceInterface {
    verify(params: any): Promise<UserInterface> | undefined | any;
}
