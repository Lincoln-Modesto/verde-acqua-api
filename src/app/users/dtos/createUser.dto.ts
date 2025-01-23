import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
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
    example: 'admin',
    enum: ['manager', 'collaborator'],
    description: 'Cargo do usuário',
  })
  @IsEnum(['manager', 'collaborator'])
  role: 'collaborator' | 'manager';
}
