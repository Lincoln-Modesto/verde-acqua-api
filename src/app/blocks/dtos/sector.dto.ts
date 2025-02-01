import {
  IsString,
  IsMongoId,
  IsArray,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class SectorDto {
  @ApiProperty({
    description: 'Nome do setor',
    example: 'Setor A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Tipo do setor',
    example: 'Bloco',
  })
  @IsString()
  @IsNotEmpty()
  labelType:
    | 'block'
    | 'tower'
    | 'building'
    | 'floor'
    | 'side'
    | 'sector'
    | 'other';

  @ApiProperty({
    description: 'ID da empresa ao qual o setor pertence',
    example: '60a54c8b8f1a4d1d885e5c3a',
  })
  @IsMongoId()
  @IsNotEmpty()
  company: Types.ObjectId;

  @ApiProperty({
    description: 'Lista de IDs das unidades associadas ao setor',
    example: ['60a54c8b8f1a4d1d885e5c3b', '60a54c8b8f1a4d1d885e5c3c'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  units: Types.ObjectId[];

  @ApiProperty({
    description: 'ID do hidrômetro associado ao setor',
    example: ['60a54c8b8f1a4d1d885e5c3d'],
  })
  @IsOptional()
  @IsMongoId()
  hydrometer?: Types.ObjectId[];
}
