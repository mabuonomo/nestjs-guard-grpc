# Nestjs - GrpcAuthGuard

<img src="https://miro.medium.com/max/4500/1*NMkClP0D2ZkWEXAPHYvy1Q.png">

GrpcAuthGuard is an agnostic guard for NestJS optimized for grpc scope. You can inject you personalized auth service to customize it. This guard read from metadatas on a grpc call.

The library contains also a decorator, called GRPCUser, that inject the user loaded into your service.

## Installation

```sh
npm i --save nestjs-guard-grpc
```

## Usage

On you controller use the guard _GrpcAuthGuard_

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

_@GRPCUser()_ is a decorator that inject the user loaded from the authentication.

Now you need to build your own auth service that implement the IAuthService interface. For example if you want to use a jwt token you can use the follow service:

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

Finally inject your own service into _GrpcAuthGuard_

```ts
@Module({
  controllers: [UserController],
  providers: [
    GrpcJwtService,
    {
      provide: 'IAuthService',
      useClass: GrpcJwtService,
    },
  ],
})
export class UsersModule {}
```

## Testing

The following code is a base grpc client. How you can see the token jwt is part of the metadata field.

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

## References

- <a href="https://docs.nestjs.com/guards">https://docs.nestjs.com/guards</a>
- <a href="https://grpc.io/">https://grpc.io/</a>
