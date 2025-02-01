import { Test, TestingModule } from '@nestjs/testing';
import { CondosService } from './company.service';

describe('CondosService', () => {
  let service: CondosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondosService],
    }).compile();

    service = module.get<CondosService>(CondosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
