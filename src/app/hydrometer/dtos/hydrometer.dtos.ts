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

export class CreateHydrometerDto {
  @ApiProperty({ description: 'Nome do hidrômetro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID da empresa associada' })
  @IsNotEmpty()
  company: Types.ObjectId;

  @ApiProperty({ description: 'ID do setor associado' })
  sector: Types.ObjectId;

  @ApiProperty({ description: 'ID da unidade associada' })
  unit: Types.ObjectId;

  @ApiProperty({ description: 'Ambiente onde o hidrômetro está localizado' })
  @IsString()
  @IsNotEmpty()
  environment: string;

  @ApiProperty({ description: 'Descrição do hidrômetro', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Fabricante do hidrômetro' })
  @IsString()
  @IsOptional()
  manufacturer: string;

  @ApiProperty({ description: 'Modelo do hidrômetro' })
  @IsOptional()
  @IsString()
  hydrometerModel: string;

  @ApiProperty({ description: 'Número de série do hidrômetro' })
  @IsOptional()
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'Data de instalação do hidrômetro' })
  @IsOptional()
  @IsDate()
  installationDate: Date;

  @ApiProperty({
    description: 'Status do hidrômetro',
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active',
  })
  @IsEnum(['active', 'inactive', 'maintenance'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Última leitura registrada do hidrômetro',
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
    description: 'Próxima leitura registrada do hidrômetro',
    required: false,
  })
  @IsDate()
  @IsOptional()
  nextReadingDate?: Date;

  @ApiProperty({ description: 'Imagem do hidrômetro' })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ description: 'Tipo do hidrômetro', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Localização geográfica do hidrômetro',
    required: false,
  })
  @IsObject()
  @IsOptional()
  location?: LocationType;
}
