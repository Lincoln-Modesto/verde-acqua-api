import { Test, TestingModule } from '@nestjs/testing';
import { HydrometerController } from './hydrometer.controller';

describe('HydrometerController', () => {
  let controller: HydrometerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HydrometerController],
    }).compile();

    controller = module.get<HydrometerController>(HydrometerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
