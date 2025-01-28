import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Block } from 'src/app/blocks/schemas/block.schema';

export type CondoDocument = HydratedDocument<Condo>;

@Schema()
export class Condo extends Document {
  @ApiProperty({
    description: 'O nome do condomínio',
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
    description: 'Lista de IDs dos blocos associados ao condomínio',
    type: [String],
    example: ['605c72ef7d1f4c23c4d5a6b1', '605c72ef7d1f4c23c4d5a6b2'],
  })
  @Prop({ type: [Types.ObjectId], ref: Block.name, default: [] })
  blocks: Types.ObjectId[];

  @ApiProperty({
    description: 'Rótulo para os blocos no condomínio',
    example: 'Torre',
  })
  @Prop({ required: true })
  blockLabel: string;

  @ApiProperty({
    description: 'Rótulo para as unidades no condomínio',
    example: 'Apartamento',
  })
  @Prop({ required: true })
  unitLabel: string;

  @ApiProperty({
    description: 'Indica se o condomínio está ativo',
    default: true,
    example: true,
  })
  @Prop({ default: true })
  active: boolean;

  @ApiProperty({
    description: 'CNPJ do condomínio',
    example: '12.345.678/0001-99',
  })
  @Prop({ required: true })
  cnpj: string;
}

export const CondoSchema = SchemaFactory.createForClass(Condo);
