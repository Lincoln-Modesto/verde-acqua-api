import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { isPasswordStrong } from 'src/utils/password.util';
import * as bcrypt from 'bcrypt';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<ApiResponse<User | string>> {
    try {
      const { email, password, role } = user;

      if (role !== 'collaborator' && role !== 'manager') {
        throw new BadRequestException(
          'O cargo do usuário deve ser "collaborator" ou "manager".',
        );
      }

      if (await this.emailExists(email as string)) {
        throw new BadRequestException(
          'O e-mail já está cadastrado no sistema.',
        );
      }

      if (!isPasswordStrong(password as string)) {
        throw new BadRequestException(
          'A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial.',
        );
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

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<User>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.userModel.countDocuments(filter).exec();

    const data = await this.userModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      success: true,
      message: 'Consulta realizada com sucesso.',
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByCondo(condo: string): Promise<User[]> {
    return this.userModel.find({ condo }).exec();
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...rest } = user;
    return this.userModel.findByIdAndUpdate(id, rest, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
