import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type WhitelabelDocument = HydratedDocument<Whitelabel>;

class Properties {
  @ApiProperty({
    description: 'Cores da identidade visual',
    example: ['#ffffff', '#000000'],
  })
  colors: string[];

  @ApiProperty({
    description: 'URL do logotipo',
    example: 'https://exemplo.com/logo.png',
  })
  logo: string;
}

@Schema()
export class Whitelabel {
  @ApiProperty({ description: 'Nome da whitelabel', example: 'Minha Empresa' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12.345.678/0001-90',
  })
  @Prop({ required: true })
  cnpj: string;

  @ApiProperty({
    description: 'E-mail de contato',
    example: 'contato@empresa.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Status ativo/inativo', example: 'true' })
  @Prop({ required: true })
  active: string;

  @ApiProperty({
    description: 'Referência para empresas associadas',
    type: String,
    example: ['60d5f9b9f1b4a3b4c8d9f9b9'],
  })
  @Prop({ type: [Types.ObjectId], ref: 'Company', required: true })
  companies: Types.ObjectId[];

  @ApiProperty({
    description: 'Endereço da empresa',
    example: 'Rua Exemplo, 123, São Paulo - SP',
  })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ description: 'Propriedades visuais da whitelabel' })
  @Prop({ type: Object, required: true })
  properties: Properties;
}

export const WhitelabelSchema = SchemaFactory.createForClass(Whitelabel);
