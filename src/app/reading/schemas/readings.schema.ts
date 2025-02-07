import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Reading extends Document {
  @ApiProperty({
    description: 'Data da leitura',
    example: '2024-02-01T12:00:00Z',
  })
  @Prop({ type: Date, required: true })
  date: Date;

  @ApiProperty({
    description: 'Empresa associada',
    example: '65f1a3c9e6b5d5a3e6b5d5a3',
  })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @ApiProperty({
    description: 'Medidor referenciado',
    example: '65f1b3c9e6b5d5a3e6b5d5b4',
  })
  @Prop({ type: Types.ObjectId, ref: 'Meter', required: true })
  meter: Types.ObjectId;

  @ApiProperty({
    description: 'Foto da leitura',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @Prop({ type: String })
  image?: string;

  @ApiProperty({ description: 'Valor da leitura atual', example: 1234.56 })
  @Prop({ type: Number, required: true })
  value: number;

  @ApiProperty({ description: 'Valor da leitura anterior', example: 1220.3 })
  @Prop({ type: Number, required: true })
  previousValue: number;

  @ApiProperty({
    description: 'Referência para a última leitura',
    example: '65f1c3c9e6b5d5a3e6b5d5c5',
  })
  @Prop({ type: Types.ObjectId, ref: 'HydrometerReading', required: false })
  lastRead?: Types.ObjectId;

  @ApiProperty({
    description: 'Usuário que realizou a leitura',
    example: '65f1d3c9e6b5d5a3e6b5d5d6',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-02-01T12:05:00Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-02-01T13:00:00Z',
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty({
    description: 'Setor vinculado',
    example: '65f1e3c9e6b5d5a3e6b5d5e7',
  })
  @Prop({ type: Types.ObjectId, ref: 'Sector', required: true })
  sector: Types.ObjectId;

  @ApiProperty({
    description: 'Tipo do medidor',
    enum: ['water', 'electricity', 'gas'],
  })
  @Prop({ type: ['water', 'electricity', 'gas'], required: true })
  meterType: Types.ObjectId;

  @ApiProperty({
    description: 'Unidade associada',
    example: '65f1f3c9e6b5d5a3e6b5d5f8',
  })
  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unit: Types.ObjectId;

  @ApiProperty({
    description: 'Tipo da leitura',
    example: 'manual',
    enum: ['manual', 'automática', 'estimada'],
  })
  @Prop({
    type: String,
    enum: ['manual', 'automática', 'estimada'],
    required: true,
  })
  readingType: string;

  @ApiProperty({
    description: 'Diferença entre a leitura atual e a anterior',
    example: 14.26,
  })
  @Prop({ type: Number, required: true })
  difference: number;

  @ApiProperty({
    description: 'Status da leitura',
    example: 'pendente',
    enum: ['pendente', 'validada', 'rejeitada'],
  })
  @Prop({
    type: String,
    enum: ['pendente', 'validada', 'rejeitada'],
    default: 'pendente',
  })
  status: string;

  @ApiProperty({
    description: 'Notas adicionais',
    example: 'Verificado consumo anômalo',
    required: false,
  })
  @Prop({ type: String })
  notes?: string;

  @ApiProperty({
    description: 'Localização GPS da leitura',
    example: { lat: -23.55052, lng: -46.633308 },
    required: false,
  })
  @Prop({ type: { lat: Number, lng: Number }, required: false })
  gpsLocation?: { lat: number; lng: number };

  @ApiProperty({
    description: 'Usuário que aprovou a leitura',
    example: '65f203c9e6b5d5a3e6b5d600',
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @ApiProperty({
    description: 'Alerta de consumo anômalo',
    example: true,
    required: false,
  })
  @Prop({ type: Boolean, default: false })
  alert?: boolean;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
