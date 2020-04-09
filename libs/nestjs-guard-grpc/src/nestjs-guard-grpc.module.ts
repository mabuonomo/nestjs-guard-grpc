import { Module } from '@nestjs/common';
import { NestjsGuardGrpcService } from './nestjs-guard-grpc.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  providers: [NestjsGuardGrpcService, JwtService],
  exports: [NestjsGuardGrpcService],
})
export class NestjsGuardGrpcModule {}
