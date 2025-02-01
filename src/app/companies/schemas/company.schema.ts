import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Sector } from 'src/app/blocks/schemas/sector.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company extends Document {
  @ApiProperty({
    description: 'O nome da empresa',
    example: 'Sunset Towers',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'O endereço do condomínio',
    example: 'Rua Principal, 123, São Paulo, SP',
  })
  @Prop({ required: true })
  address: string;

  @ApiProperty({
    description: 'Lista de IDs dos setores associados a empresa',
    type: [String],
    example: ['605c72ef7d1f4c23c4d5a6b1', '605c72ef7d1f4c23c4d5a6b2'],
  })
  @Prop({ type: [Types.ObjectId], ref: Sector.name, default: [] })
  sector?: Types.ObjectId[];

  @ApiProperty({
    description: 'Tipo da empresa',
    example: 'Condomínio',
    required: true,
  })
  @Prop({ required: true })
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
    description: 'Indica se a empresa está ativa',
    default: true,
    example: true,
  })
  @Prop({ default: true })
  active: boolean;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12.345.678/0001-99',
  })
  @Prop({ required: true })
  cnpj: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
