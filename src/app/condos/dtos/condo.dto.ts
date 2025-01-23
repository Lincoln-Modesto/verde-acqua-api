import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateCondoDto {
  @ApiProperty({
    description: 'O nome do condomínio',
    example: 'Residencial Bela Vista',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'O endereço do condomínio',
    example: 'Avenida Central, 1234, São Paulo, SP',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Lista de IDs dos blocos associados ao condomínio',
    type: [String],
    example: ['60a54c8b8f1a4d1d885e5c3a', '60a54c8b8f1a4d1d885e5c3b'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  blocks: string[];

  @ApiProperty({
    description: 'Rótulo para os blocos no condomínio',
    example: 'Torre',
  })
  @IsString()
  blockLabel: string;

  @ApiProperty({
    description: 'Rótulo para as unidades no condomínio',
    example: 'Apartamento',
  })
  @IsString()
  unitLabel: string;

  @ApiProperty({
    description: 'Indica se o condomínio está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'CNPJ do condomínio',
    example: '12.345.678/0001-99',
  })
  @IsString()
  cnpj: string;
}
