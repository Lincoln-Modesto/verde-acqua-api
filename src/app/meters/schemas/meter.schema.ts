import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MeterDocument = HydratedDocument<Meter>;

class LocationType {
  latitude: number;
  longitude: number;
}

@Schema()
export class Meter extends Document {
  @ApiProperty({ description: 'Nome do Medidor' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'ID da empresa associada' })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @ApiProperty({
    description: 'Tipo do medidor',
    enum: ['water', 'electricity', 'gas'],
  })
  @Prop(['water', 'electricity', 'gas'])
  meterType: 'water' | 'electricity' | 'gas';

  @ApiProperty({ description: 'ID do setor associado' })
  @Prop({ type: Types.ObjectId, ref: 'Sector' })
  sector: Types.ObjectId;

  @ApiProperty({ description: 'ID da unidade associada' })
  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  unit: Types.ObjectId;

  @ApiProperty({ description: 'Imagem do Medidor' })
  @Prop()
  image: string;

  @ApiProperty({ description: 'Ambiente onde o Medidor está localizado' })
  @Prop({ required: true })
  environment: string;

  @ApiProperty({ description: 'Descrição do Medidor' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Fabricante do Medidor' })
  @Prop()
  manufacturer: string;

  @ApiProperty({ description: 'Modelo do Medidor' })
  @Prop()
  meterModel: string;

  @ApiProperty({
    description: 'Número de série do Medidor',
    uniqueItems: true,
  })
  @Prop({ unique: true })
  serialNumber: string;

  @ApiProperty({ description: 'Data de instalação do Medidor' })
  @Prop()
  installationDate: Date;

  @ApiProperty({
    description: 'Status do Medidor',
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active',
  })
  @Prop({
    required: true,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active',
  })
  status: string;

  @ApiProperty({
    description: 'Última leitura registrada do Medidor',
    required: false,
  })
  @Prop()
  lastReading?: number;

  @ApiProperty({
    description: 'Próxima leitura registrada do Medidor',
    required: false,
  })
  @Prop()
  nextReadingDate?: Date;

  @ApiProperty({
    description: 'Data da última leitura registrada',
    required: false,
  })
  @Prop()
  lastReadingDate?: Date;

  @ApiProperty({ description: 'Tipo do Medidor', required: false })
  @Prop()
  type?: string;

  @ApiProperty({
    description: 'Localização geográfica do Medidor',
    required: false,
  })
  @Prop()
  location?: LocationType;
}

export const MeterSchema = SchemaFactory.createForClass(Meter);
