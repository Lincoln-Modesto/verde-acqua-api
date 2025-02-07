import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GpsLocationDto {
  @ApiProperty({ description: 'Latitude da leitura', example: -23.55052 })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Longitude da leitura', example: -46.633308 })
  @IsNumber()
  lng: number;
}

export class ReadingDto {
  @ApiProperty({
    description: 'Data da leitura',
    example: '2024-02-01T12:00:00Z',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Empresa associada',
    example: '65f1a3c9e6b5d5a3e6b5d5a3',
  })
  @IsMongoId()
  company: string;

  @ApiProperty({
    description: 'Medidor referenciado',
    example: '65f1b3c9e6b5d5a3e6b5d5b4',
  })
  @IsMongoId()
  meter: string;

  @ApiProperty({
    description: 'Foto da leitura',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'Valor da leitura atual', example: 1234.56 })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Valor da leitura anterior', example: 1220.3 })
  @IsNumber()
  previousValue: number;

  @ApiProperty({
    description: 'Referência para a última leitura',
    example: '65f1c3c9e6b5d5a3e6b5d5c5',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  lastRead?: string;

  @ApiProperty({
    description: 'Usuário que realizou a leitura',
    example: '65f1d3c9e6b5d5a3e6b5d5d6',
  })
  @IsMongoId()
  createdBy: string;

  @ApiProperty({
    description: 'Setor vinculado',
    example: '65f1e3c9e6b5d5a3e6b5d5e7',
  })
  @IsMongoId()
  sector: string;

  @ApiProperty({
    description: 'Unidade associada',
    example: '65f1f3c9e6b5d5a3e6b5d5f8',
  })
  @IsMongoId()
  unit: string;

  @ApiProperty({
    description: 'Tipo da leitura',
    example: 'manual',
    enum: ['manual', 'automática', 'estimada'],
  })
  @IsEnum(['manual', 'automática', 'estimada'])
  readingType: string;

  @ApiProperty({
    description: 'Tipo da leitura',
    example: 'manual',
    enum: ['water', 'electricity', 'gas'],
  })
  @IsEnum(['water', 'electricity', 'gas'])
  metertType: string;

  @ApiProperty({
    description: 'Diferença entre a leitura atual e a anterior',
    example: 14.26,
  })
  @IsNumber()
  difference: number;

  @ApiProperty({
    description: 'Status da leitura',
    example: 'pendente',
    enum: ['pendente', 'validada', 'rejeitada'],
  })
  @IsEnum(['pendente', 'validada', 'rejeitada'])
  status: string;

  @ApiProperty({
    description: 'Notas adicionais',
    example: 'Verificado consumo anômalo',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Localização GPS da leitura',
    required: false,
    type: GpsLocationDto,
  })
  @ValidateNested()
  @Type(() => GpsLocationDto)
  @IsOptional()
  gpsLocation?: GpsLocationDto;

  @ApiProperty({
    description: 'Usuário que aprovou a leitura',
    example: '65f203c9e6b5d5a3e6b5d600',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  approvedBy?: string;

  @ApiProperty({
    description: 'Alerta de consumo anômalo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  alert?: boolean;
}
