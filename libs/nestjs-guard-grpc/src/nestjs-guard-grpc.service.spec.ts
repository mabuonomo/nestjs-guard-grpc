import { Test, TestingModule } from '@nestjs/testing';
import { NestjsGuardGrpcService } from './nestjs-guard-grpc.service';

describe('NestjsGuardGrpcService', () => {
  let service: NestjsGuardGrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsGuardGrpcService],
    }).compile();

    service = module.get<NestjsGuardGrpcService>(NestjsGuardGrpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
