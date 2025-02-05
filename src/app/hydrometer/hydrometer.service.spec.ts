import { Test, TestingModule } from '@nestjs/testing';
import { HydrometerService } from './hydrometer.service';

describe('HydrometerService', () => {
  let service: HydrometerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HydrometerService],
    }).compile();

    service = module.get<HydrometerService>(HydrometerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
