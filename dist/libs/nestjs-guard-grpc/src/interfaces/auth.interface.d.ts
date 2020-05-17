import { UserInterface } from './user.interface';
export interface AuthServiceInterface {
    verify(params: any): UserInterface | undefined | any;
}
