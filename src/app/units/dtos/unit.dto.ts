import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UnitDto {
  @ApiProperty({
    description: 'ID do condomínio ao qual a unidade pertence',
    example: '64be67f4b8924b0012e7cde9',
    type: String,
  })
  condo: Types.ObjectId;

  @ApiProperty({
    description: 'ID do bloco ao qual a unidade pertence',
    example: '64be68a3c1b3420013e8dfea',
    type: String,
  })
  block: Types.ObjectId;

  @ApiProperty({
    description: 'Nome ou identificação da unidade',
    example: 'Apt 101',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Lista de IDs dos moradores da unidade',
    example: ['64be69d5c7f8920014e9afeb', '64be69e1a7f1930015e9dfec'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  dwellers?: Types.ObjectId[];

  @ApiProperty({
    description: 'ID do hidrômetro associado à unidade',
    example: '64be6a02d5e8920016e9fdeb',
    type: String,
  })
  @IsOptional()
  hydrometer?: Types.ObjectId;
}
