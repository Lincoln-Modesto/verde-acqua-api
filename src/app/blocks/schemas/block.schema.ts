import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Unit } from 'src/app/units/schemas/unit.schema';

export type BlockDocument = HydratedDocument<Block>;

@Schema()
export class Block extends Document {
  @ApiProperty({
    description: 'Nome do bloco',
    example: 'Bloco A',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'ID do condomínio ao qual o bloco pertence',
    example: '60a54c8b8f1a4d1d885e5c3a',
  })
  @Prop({ type: Types.ObjectId, ref: 'Condo', required: true })
  condo: Types.ObjectId;

  @ApiProperty({
    description: 'Lista de IDs das unidades associadas ao bloco',
    example: ['60a54c8b8f1a4d1d885e5c3b', '60a54c8b8f1a4d1d885e5c3c'],
    type: [String],
  })
  @Prop({ type: [Types.ObjectId], ref: Unit.name, default: [] })
  units: Types.ObjectId[];

  @ApiProperty({
    description: 'ID do hidrômetro associado ao bloco',
    example: '60a54c8b8f1a4d1d885e5c3d',
  })
  @Prop({ type: [Types.ObjectId], ref: 'Hydrometer', default: [] })
  hydrometer: Types.ObjectId[];
}

export const BlockSchema = SchemaFactory.createForClass(Block);
