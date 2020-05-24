# nestjs-guard-grpc
WIP

```ts
@Controller()
export class UserController {
  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'FindAll')
  findAll(@GRPCUser() user: User, metadata: any) {
    console.log('User injected', user);
    return [];
  }
}
```

```ts
import { Injectable } from '@nestjs/common';
import { UserInterface, IAuthService } from 'nestjs-guard-grpc';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
const jwksClient = require('jwks-rsa');

@Injectable()
export class GrpcJwtService implements IAuthService {
  client: any;

  constructor(private configService: ConfigService) {
    this.client = jwksClient({
      jwksUri: configService.get<string>('auth.jwks_uri'),
      issuer: configService.get<string>('auth.iss'),
      audience: configService.get<string>('auth.aud'),
    });
  }

  async verify(params: any): Promise<UserInterface | undefined> {
    let token = params;
    let self = this;

    return new Promise(function (resolve, reject) {
      jwt.verify(token, getKey, {}, (err, decoded) => {
        if (err) reject(err);

        resolve(decoded);
      });
    }).then((user) => user);

    function getKey(header, callback) {
      self.client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    }
  }
}
```

```ts
const echoService = new UserServiceClient('http://localhost:8080', null, null);

const request = new Empty();

let jwt = '{your_jwt_token}';

const call = echoService.findAll(
  request,
  { Authorization: 'Bearer ' + jwt },
  (err: grpcWeb.Error, response: UserList) => {
    console.log(err);
    console.log(response);
  },
);
call.on('status', (status: grpcWeb.Status) => {
  console.log('Status', status);
});
```
