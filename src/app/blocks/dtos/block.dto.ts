import { IsString, IsMongoId, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateBlockDto {
  @ApiProperty({
    description: 'Nome do bloco',
    example: 'Bloco A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID do condomínio ao qual o bloco pertence',
    example: '60a54c8b8f1a4d1d885e5c3a',
  })
  @IsMongoId()
  @IsNotEmpty()
  condo: Types.ObjectId;

  @ApiProperty({
    description: 'Lista de IDs das unidades associadas ao bloco',
    example: ['60a54c8b8f1a4d1d885e5c3b', '60a54c8b8f1a4d1d885e5c3c'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  units: Types.ObjectId[];

  @ApiProperty({
    description: 'ID do hidrômetro associado ao bloco',
    example: '60a54c8b8f1a4d1d885e5c3d',
  })
  @IsMongoId()
  @IsNotEmpty()
  hydrometer: Types.ObjectId[];
}
