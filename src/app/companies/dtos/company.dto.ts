import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CompanyDto {
  @ApiProperty({
    description: 'O nome da empresa',
    example: 'Residencial Bela Vista',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'O endereço da empresa',
    example: 'Avenida Central, 1234, São Paulo, SP',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Lista de IDs dos setores associados a empresa',
    type: [String],
    example: ['60a54c8b8f1a4d1d885e5c3a', '60a54c8b8f1a4d1d885e5c3b'],
  })
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  sectors?: Types.ObjectId[];

  @ApiProperty({
    description: 'Indica se o condomínio está ativo',
    example: true,
    required: false,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Tipo da empresa',
    example: 'Condomínio',
    required: true,
  })
  @IsString()
  type:
    | 'condo'
    | 'hospital'
    | 'school'
    | 'mall'
    | 'office'
    | 'hotel'
    | 'factory'
    | 'other';

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12.345.678/0001-99',
  })
  @IsString()
  cnpj: string;
}
