import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condo, CondoDocument } from './schemas/condo.schema';
import { CreateCondoDto } from './dtos/condo.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class CondosService {
  constructor(
    @InjectModel(Condo.name) private condoModel: Model<CondoDocument>,
  ) {}

  async create(
    createCondoDto: CreateCondoDto,
  ): Promise<ApiResponse<Condo | string>> {
    try {
      const newCondo = new this.condoModel(createCondoDto);
      const savedCondo = await newCondo.save();
      return {
        success: true,
        message: 'Condomínio criado com sucesso.',
        data: savedCondo,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao criar condomínio.',
        data: errorMessage,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<Condo>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.condoModel.countDocuments(filter).exec();

    const data = await this.condoModel
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

  async findOne(id: string): Promise<Condo | null> {
    return this.condoModel.findById(id).exec();
  }
}
