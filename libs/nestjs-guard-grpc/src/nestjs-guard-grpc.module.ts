import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';

@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class NestjsGuardGrpcModule {}
