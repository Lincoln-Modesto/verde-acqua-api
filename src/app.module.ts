import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { CompanyModule } from './app/companies/company.module';
import { SectorModule } from './app/blocks/sectors.module';
import { UnitsModule } from './app/units/units.module';
import { WhitelabelModule } from './app/whitelabel/whitelabel.module';
import { HydrometerModule } from './app/hydrometer/hydrometer.module';
import { HydrometerReadingModule } from './app/hydrometer-reading/hydrometer-reading.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CompanyModule,
    SectorModule,
    UnitsModule,
    WhitelabelModule,
    HydrometerModule,
    HydrometerReadingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
