import { Test, TestingModule } from '@nestjs/testing';
import { HydrometerReadingService } from './hydrometer-reading.service';

describe('HydrometerReadingService', () => {
  let service: HydrometerReadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HydrometerReadingService],
    }).compile();

    service = module.get<HydrometerReadingService>(HydrometerReadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
