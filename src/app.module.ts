import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { CondosModule } from './app/condos/condos.module';
import { BlocksModule } from './app/blocks/blocks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my-database'),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    CondosModule,
    BlocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
