import { Module } from '@nestjs/common';
import { CondosController } from './condos.controller';
import { CondosService } from './condos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CondoSchema, Condo } from './schemas/condo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Condo.name, schema: CondoSchema }]),
  ],
  controllers: [CondosController],
  providers: [CondosService],
  exports: [CondosService],
})
export class CondosModule {}
