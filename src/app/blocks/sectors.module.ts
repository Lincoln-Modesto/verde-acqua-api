import { Module } from '@nestjs/common';
import { SectorService } from './sectors.service';
import { SectorController } from './sectors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sector, SectorSchema } from './schemas/sector.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sector.name, schema: SectorSchema }]),
  ],
  providers: [SectorService],
  controllers: [SectorController],
  exports: [SectorService],
})
export class SectorModule {}
