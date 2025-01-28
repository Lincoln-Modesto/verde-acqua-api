import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UnitDocument = HydratedDocument<Unit>;

@Schema()
export class Unit {
  @ApiProperty({
    description: 'ID do condomínio ao qual a unidade pertence',
    example: '64be67f4b8924b0012e7cde9',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Condo', required: true })
  condo: Types.ObjectId;

  @ApiProperty({
    description: 'ID do bloco ao qual a unidade pertence',
    example: '64be68a3c1b3420013e8dfea',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Block', required: true })
  block: Types.ObjectId;

  @ApiProperty({
    description: 'Nome ou identificação da unidade',
    example: 'Apt 101',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    description: 'Lista de IDs dos moradores da unidade',
    example: ['64be69d5c7f8920014e9afeb', '64be69e1a7f1930015e9dfec'],
    type: [String],
  })
  @Prop({ type: [Types.ObjectId], ref: 'Dweller', default: [] })
  dwellers: Types.ObjectId[];

  @ApiProperty({
    description: 'ID do hidrômetro associado à unidade',
    example: '64be6a02d5e8920016e9fdeb',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Hydrometer', required: false })
  hydrometer?: Types.ObjectId;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
