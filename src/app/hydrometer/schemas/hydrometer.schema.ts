import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type HydrometerDocument = HydratedDocument<Hydrometer>;

class LocationType {
  latitude: number;
  longitude: number;
}

@Schema()
export class Hydrometer extends Document {
  @ApiProperty({ description: 'Nome do hidrômetro' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'ID da empresa associada' })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @ApiProperty({ description: 'ID do setor associado' })
  @Prop({ type: Types.ObjectId, ref: 'Sector' })
  sector: Types.ObjectId;

  @ApiProperty({ description: 'ID da unidade associada' })
  @Prop({ type: Types.ObjectId, ref: 'Unit' })
  unit: Types.ObjectId;

  @ApiProperty({ description: 'Imagem do hidrômetro' })
  @Prop()
  image: string;

  @ApiProperty({ description: 'Ambiente onde o hidrômetro está localizado' })
  @Prop({ required: true })
  environment: string;

  @ApiProperty({ description: 'Descrição do hidrômetro' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Fabricante do hidrômetro' })
  @Prop()
  manufacturer: string;

  @ApiProperty({ description: 'Modelo do hidrômetro' })
  @Prop()
  hydrometerModel: string;

  @ApiProperty({
    description: 'Número de série do hidrômetro',
    uniqueItems: true,
  })
  @Prop({ unique: true })
  serialNumber: string;

  @ApiProperty({ description: 'Data de instalação do hidrômetro' })
  @Prop()
  installationDate: Date;

  @ApiProperty({
    description: 'Status do hidrômetro',
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
    description: 'Última leitura registrada do hidrômetro',
    required: false,
  })
  @Prop()
  lastReading?: number;

  @ApiProperty({
    description: 'Próxima leitura registrada do hidrômetro',
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

  @ApiProperty({ description: 'Tipo do hidrômetro', required: false })
  @Prop()
  type?: string;

  @ApiProperty({
    description: 'Localização geográfica do hidrômetro',
    required: false,
  })
  @Prop()
  location?: LocationType;
}

export const HydrometerSchema = SchemaFactory.createForClass(Hydrometer);
