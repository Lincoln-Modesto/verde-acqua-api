import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import { isPasswordStrong } from 'src/utils/password.util';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload = {
      email: user.email,
      role: user.role,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    user: Partial<User>,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const { email, password } = user;

      if (await this.usersService.emailExists(email as string)) {
        throw new BadRequestException(
          'O e-mail já está cadastrado no sistema.',
        );
      }

      if (!isPasswordStrong(password as string)) {
        return {
          success: false,
          message:
            'A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial.',
        };
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password as string, saltRounds);

      const newUser = new this.userModel({
        ...user,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      return {
        success: true,
        message: 'Usuário registrado com sucesso.',
        data: savedUser,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao registrar usuário.',
        data: errorMessage,
      };
    }
  }
}
