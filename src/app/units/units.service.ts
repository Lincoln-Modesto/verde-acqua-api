import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit, UnitDocument } from './schemas/unit.schema';
import { UnitDto } from './dtos/unit.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class UnitsService {
  constructor(@InjectModel(Unit.name) private unitModel: Model<UnitDocument>) {}

  async create(createUnitDto: UnitDto): Promise<ApiResponse<Unit | string>> {
    try {
      const newUnit = new this.unitModel(createUnitDto);
      const savedUnit = await newUnit.save();
      return {
        success: true,
        message: 'Unidade criada com sucesso.',
        data: savedUnit,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao criar unidade.',
        data: errorMessage,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<Unit>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.unitModel.countDocuments(filter).exec();

    const data = await this.unitModel
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

  async findOne(id: string): Promise<ApiResponse<Unit | string>> {
    try {
      const unit = await this.unitModel.findById(id).exec();
      if (!unit) {
        return {
          success: false,
          message: 'Unidade não encontrada.',
          data: 'Unidade não encontrada.',
        };
      }
      return {
        success: true,
        message: 'Unidade encontrada com sucesso.',
        data: unit,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao buscar unidade.',
        data: errorMessage,
      };
    }
  }

  async update(
    id: string,
    updateUnitDto: Partial<UnitDto>,
  ): Promise<ApiResponse<Unit | string>> {
    try {
      const updatedUnit = await this.unitModel
        .findByIdAndUpdate(id, updateUnitDto, { new: true })
        .exec();
      if (!updatedUnit) {
        return {
          success: false,
          message: 'Unidade não encontrada para atualização.',
          data: 'Unidade não encontrada.',
        };
      }
      return {
        success: true,
        message: 'Unidade atualizada com sucesso.',
        data: updatedUnit,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao atualizar unidade.',
        data: errorMessage,
      };
    }
  }

  async delete(id: string): Promise<ApiResponse<string>> {
    try {
      const deletedUnit = await this.unitModel.findByIdAndDelete(id).exec();
      if (!deletedUnit) {
        return {
          success: false,
          message: 'Unidade não encontrada para exclusão.',
          data: 'Unidade não encontrada.',
        };
      }
      return {
        success: true,
        message: 'Unidade removida com sucesso.',
        data: 'Unidade removida com sucesso.',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao remover unidade.',
        data: errorMessage,
      };
    }
  }
}
