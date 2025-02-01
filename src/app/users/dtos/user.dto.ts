import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'E-mail do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '+55 11 99999-9999',
    description: 'Número de telefone do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: ['64be69e1a7f1930015e9dfec', '64be69e1a7f1930015e9dfec'],
    description: 'Lista de IDs de condomínios ao qual o usuário pertence',
    required: false,
  })
  @IsOptional()
  @IsString()
  condos?: Types.ObjectId[];

  @ApiProperty({
    example: ['64be69e1a7f1930015e9dfec', '64be69e1a7f1930015e9dfec'],
    description: 'Lista de IDs de empresas ao qual o usuário pertence',
    required: false,
  })
  @IsOptional()
  @IsString()
  company?: Types.ObjectId[];

  @ApiProperty({
    example: 'admin',
    enum: ['manager', 'collaborator'],
    description: 'Cargo do usuário',
  })
  @IsEnum(['manager', 'collaborator'])
  role: 'collaborator' | 'manager';
}
