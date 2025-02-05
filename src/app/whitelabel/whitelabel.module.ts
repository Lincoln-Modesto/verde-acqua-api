import { Module } from '@nestjs/common';
import { WhitelabelService } from './whitelabel.service';
import { WhitelabelController } from './whitelabel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Whitelabel, WhitelabelSchema } from './schemas/whitelabel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Whitelabel.name, schema: WhitelabelSchema },
    ]),
  ],
  providers: [WhitelabelService],
  controllers: [WhitelabelController],
  exports: [WhitelabelService],
})
export class WhitelabelModule {}
