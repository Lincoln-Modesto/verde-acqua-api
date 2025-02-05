import { Module } from '@nestjs/common';
import { HydrometerController } from './hydrometer.controller';
import { HydrometerService } from './hydrometer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hydrometer, HydrometerSchema } from './schemas/hydrometer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hydrometer.name, schema: HydrometerSchema },
    ]),
  ],
  controllers: [HydrometerController],
  providers: [HydrometerService],
  exports: [HydrometerService],
})
export class HydrometerModule {}
