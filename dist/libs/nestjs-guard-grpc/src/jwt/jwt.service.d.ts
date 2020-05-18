import * as jwt from 'jsonwebtoken';
import { AuthServiceInterface } from '../interfaces/auth.interface';
import { JwksClient } from 'jwks-rsa';
export declare class JwtService implements AuthServiceInterface {
    client: JwksClient;
    verify(params: any): any;
    getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback): void;
}
