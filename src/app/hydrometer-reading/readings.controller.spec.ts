import { Test, TestingModule } from '@nestjs/testing';
import { HydrometerReadingController } from './readings.controller';

describe('HydrometerReadingController', () => {
  let controller: HydrometerReadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HydrometerReadingController],
    }).compile();

    controller = module.get<HydrometerReadingController>(HydrometerReadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
