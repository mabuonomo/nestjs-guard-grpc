import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { AuthServiceInterface } from '../interfaces/auth.interface';

@Injectable()
export class JwtService implements AuthServiceInterface {
  client: jwks.JwksClient;
  constructor(options: jwks.ClientOptions) {
    this.client = new jwks.JwksClient(options);
  }
  verify(params: any): boolean {
    return jwt.verify(params.token, this.getKey, params.options);
  }

  getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    this.client.getSigningKey(header.kid, (err: Error, key: jwks.RsaSigningKey) => {
      const signingKey = key.getPublicKey() || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
}
