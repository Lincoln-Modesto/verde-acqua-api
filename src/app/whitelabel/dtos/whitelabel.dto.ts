import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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

export class CreateWhitelabelDto {
  @ApiProperty({ description: 'Nome da whitelabel', example: 'Minha Empresa' })
  name: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12.345.678/0001-90',
  })
  cnpj: string;

  @ApiProperty({
    description: 'E-mail de contato',
    example: 'contato@empresa.com',
  })
  email: string;

  @ApiProperty({ description: 'Status ativo/inativo', example: 'true' })
  active: string;

  @ApiProperty({
    description: 'Referência para empresas associadas',
    type: String,
    example: ['60d5f9b9f1b4a3b4c8d9f9b9'],
  })
  companies: [Types.ObjectId];

  @ApiProperty({
    description: 'Endereço da empresa',
    example: 'Rua Exemplo, 123, São Paulo - SP',
  })
  address: string;

  @ApiProperty({ description: 'Propriedades visuais da whitelabel' })
  properties: Properties;
}
