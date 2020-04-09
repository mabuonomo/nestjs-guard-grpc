import { Module } from '@nestjs/common';
import { NestjsGuardGrpcService } from './nestjs-guard-grpc.service';

@Module({
  providers: [NestjsGuardGrpcService],
  exports: [NestjsGuardGrpcService],
})
export class NestjsGuardGrpcModule {}
