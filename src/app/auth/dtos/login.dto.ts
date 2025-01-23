import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'Senha do usuário' })
  password: string;
}
