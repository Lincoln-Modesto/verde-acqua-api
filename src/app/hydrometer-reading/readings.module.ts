import { Module } from '@nestjs/common';
import { HydrometerReadingController } from './readings.controller';
import { HydrometerReadingService } from './readings.service';

@Module({
  controllers: [HydrometerReadingController],
  providers: [HydrometerReadingService],
})
export class HydrometerReadingModule {}
