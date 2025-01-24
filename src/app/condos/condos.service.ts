import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condo, CondoDocument } from './schemas/condo.schema';
import { CondoDto } from './dtos/condo.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class CondosService {
  constructor(
    @InjectModel(Condo.name) private condoModel: Model<CondoDocument>,
  ) {}

  async create(createCondoDto: CondoDto): Promise<ApiResponse<Condo | string>> {
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

  async update(
    id: string,
    condo: Partial<Condo>,
  ): Promise<ApiResponse<Condo | string>> {
    try {
      const condoUpdated = await this.condoModel
        .findByIdAndUpdate(id, condo, { new: true })
        .exec();
      return {
        success: true,
        message: 'Condomínio atualizado com sucesso.',
        data: condoUpdated ?? 'Condomínio não encontrado.',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao atualizar condomínio.',
        data: errorMessage,
      };
    }
  }

  async delete(id: string): Promise<Condo | null> {
    return this.condoModel.findByIdAndDelete(id).exec();
  }
}
