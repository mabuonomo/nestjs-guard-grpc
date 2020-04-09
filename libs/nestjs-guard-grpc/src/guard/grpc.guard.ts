import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';

// https://github.com/nestjs/passport/blob/6d9c71fa04e5c16480ba0b7e7671e43918dd9ff4/lib/auth.guard.ts
@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor() {
    // super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verify using getKey callback
    // Example uses https://github.com/auth0/node-jwks-rsa as a way to fetch the keys.
    // var jwksClient = require('jwks-rsa');
    const client = new jwks.JwksClient({
      jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json',
    });

    function getKey(header: any, callback: any) {
      client.getSigningKey(header.kid, (err: Error, key: jwks.SigningKey) => {
        const signingKey = key.getPublicKey(); // || key..rsaPublicKey;
        callback(null, signingKey);
      });
    }

    const [request, response] = [this.getRequest(context), context.switchToRpc().getContext().getResponse()];

    const type = context.getType();
    const prefix = 'Bearer ';
    let header;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1); // metadata // .SWITCHTORCP
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      return false;
    }

    const token = header.slice(header.indexOf(' ') + 1);
    try {
      //   const valid = this.jwtService.verify(token);

      const options = {};
      const decoded = await jwt.verify(token, getKey, options);

      //   user = await this.userService.save(user);
      //   request['user'] = user;

      return true;
    } catch (e) {
      return false;
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
