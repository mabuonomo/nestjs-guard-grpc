import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable()
export class JwtService implements AuthInterface {
  client: jwks.JwksClient;
  constructor(options: jwks.ClientOptions) {
    this.client = new jwks.JwksClient(options);
  }
  verify(params: any): boolean {
    jwt.verify(params.token, this.getKey, params.options);
    return true;
  }

  getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    this.client.getSigningKey(header.kid, (err: Error, key: jwks.SigningKey) => {
      const signingKey = key.getPublicKey() //|| key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
}
