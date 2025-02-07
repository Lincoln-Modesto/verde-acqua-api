import { Module } from '@nestjs/common';
import { ReadingController } from './readings.controller';
import { ReadingService } from './readings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Meter, MeterSchema } from '../meters/schemas/meter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meter.name, schema: MeterSchema }]),
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
  exports: [ReadingService],
})
export class ReadingModule {}
