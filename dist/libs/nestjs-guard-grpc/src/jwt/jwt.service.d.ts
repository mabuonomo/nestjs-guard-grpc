import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { AuthServiceInterface } from '../interfaces/auth.interface';
export declare class JwtService implements AuthServiceInterface {
    client: jwks.JwksClient;
    constructor(options: jwks.ClientOptions);
    verify(params: any): any;
    getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback): void;
}
