import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
import { Types } from 'mongoose';

class LocationType {
  latitude: number;
  longitude: number;
}

export class MeterDto {
  @ApiProperty({ description: 'Nome do meditor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID da empresa associada' })
  @IsNotEmpty()
  company: Types.ObjectId;

  @ApiProperty({
    description: 'Tipo do medidor',
    enum: ['water', 'electricity', 'gas'],
  })
  @IsEnum(['water', 'electricity', 'gas'])
  @IsNotEmpty()
  meterType: 'water' | 'electricity' | 'gas';

  @ApiProperty({ description: 'ID do setor associado' })
  sector: Types.ObjectId;

  @ApiProperty({ description: 'ID da unidade associada' })
  unit: Types.ObjectId;

  @ApiProperty({ description: 'Ambiente onde o Medidor está localizado' })
  @IsString()
  environment: string;

  @ApiProperty({ description: 'Descrição do medidor', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Fabricante do medidor' })
  @IsString()
  @IsOptional()
  manufacturer: string;

  @ApiProperty({ description: 'Modelo do medidor' })
  @IsOptional()
  @IsString()
  hydrometerModel: string;

  @ApiProperty({ description: 'Número de série do medidor' })
  @IsOptional()
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'Data de instalação do medidor' })
  @IsOptional()
  @IsDate()
  installationDate: Date;

  @ApiProperty({
    description: 'Status do medidor',
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active',
  })
  @IsEnum(['active', 'inactive', 'maintenance'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Última leitura registrada do medidor',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  lastReading?: number;

  @ApiProperty({
    description: 'Data da última leitura registrada',
    required: false,
  })
  @IsDate()
  @IsOptional()
  lastReadingDate?: Date;

  @ApiProperty({
    description: 'Próxima leitura registrada do medidor',
    required: false,
  })
  @IsDate()
  @IsOptional()
  nextReadingDate?: Date;

  @ApiProperty({ description: 'Imagem do medidor' })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ description: 'Tipo do medidor', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Localização geográfica do medidor',
    required: false,
  })
  @IsObject()
  @IsOptional()
  location?: LocationType;
}
