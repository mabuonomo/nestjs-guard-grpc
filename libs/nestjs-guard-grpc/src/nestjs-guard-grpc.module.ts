import { Module } from '@nestjs/common';
import { GrpcAuthGuard } from './guard/grpc.guard';

@Module({
  providers: [GrpcAuthGuard],
  exports: [GrpcAuthGuard],
})
export class NestjsGuardGrpcModule {}
