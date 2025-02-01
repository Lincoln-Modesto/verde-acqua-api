import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Unit } from 'src/app/units/schemas/unit.schema';

export type SectorDocument = HydratedDocument<Sector>;

@Schema()
export class Sector extends Document {
  @ApiProperty({
    description: 'Nome do setor',
    example: 'Bloco A',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Tipo do setor',
    example: 'Bloco',
  })
  @Prop({ required: true })
  labelType:
    | 'block'
    | 'tower'
    | 'building'
    | 'floor'
    | 'side'
    | 'sector'
    | 'other';

  @ApiProperty({
    description: 'ID da emopresa ao qual o setor pertence',
    example: '60a54c8b8f1a4d1d885e5c3a',
  })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @ApiProperty({
    description: 'Lista de IDs das unidades associadas ao setor',
    example: ['60a54c8b8f1a4d1d885e5c3b', '60a54c8b8f1a4d1d885e5c3c'],
    type: [String],
  })
  @Prop({ type: [Types.ObjectId], ref: Unit.name, default: [] })
  units: Types.ObjectId[];

  @ApiProperty({
    description: 'Lista de IDs de hidrômetros associados ao setor',
    example: ['60a54c8b8f1a4d1d885e5c3d'],
  })
  @Prop({ type: [Types.ObjectId], ref: 'Hydrometer', default: [] })
  hydrometer?: Types.ObjectId[];
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
