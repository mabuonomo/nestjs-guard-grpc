import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthServiceInterface } from '../interfaces/auth.interface';
import { JwksClient, ClientOptions, RsaSigningKey } from 'jwks-rsa';

export class JwtService implements AuthServiceInterface {
  client: JwksClient;
  constructor(options: ClientOptions) {
    this.client = new JwksClient(options);
  }
  verify(params: any): any {
    return jwt.verify(params.token, this.getKey, params.options);
  }

  getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    this.client.getSigningKey(header.kid, (err: Error, key: RsaSigningKey) => {
      const signingKey = key.getPublicKey() || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
}
