import { Module } from '@nestjs/common';
import { NestjsGuardGrpcService } from './nestjs-guard-grpc.service';
import { JwtService } from './jwt/jwt.service';
import { GrpcAuthGuard } from './guard/grpc.guard';

@Module({
  providers: [NestjsGuardGrpcService, JwtService],
  exports: [NestjsGuardGrpcService, GrpcAuthGuard],
})
export class NestjsGuardGrpcModule {}
