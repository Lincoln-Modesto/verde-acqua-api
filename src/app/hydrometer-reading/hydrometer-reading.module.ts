import { Module } from '@nestjs/common';
import { HydrometerReadingController } from './hydrometer-reading.controller';
import { HydrometerReadingService } from './hydrometer-reading.service';

@Module({
  controllers: [HydrometerReadingController],
  providers: [HydrometerReadingService]
})
export class HydrometerReadingModule {}
