import { Module } from '@nestjs/common';
import { MeterController } from './meter.controller';
import { MeterService } from './meter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Meter, MeterSchema } from './schemas/meter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meter.name, schema: MeterSchema }]),
  ],
  controllers: [MeterController],
  providers: [MeterService],
  exports: [MeterService],
})
export class meterModule {}
