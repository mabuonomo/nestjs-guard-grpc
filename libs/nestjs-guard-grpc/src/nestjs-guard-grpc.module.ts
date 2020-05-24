import { Module } from '@nestjs/common';
import { GrpcAuthGuard } from './guard/grpc.guard';

@Module({
  providers: [],
  exports: [],
})
export class NestjsGuardGrpcModule {}
