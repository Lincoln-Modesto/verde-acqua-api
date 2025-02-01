import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sector, SectorDocument } from './schemas/sector.schema';
import { SectorDto } from './dtos/sector.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class SectorService {
  constructor(
    @InjectModel(Sector.name)
    private readonly sectorModel: Model<SectorDocument>,
  ) {}

  async create(sectorDto: SectorDto): Promise<ApiResponse<Sector | string>> {
    try {
      const newSector = new this.sectorModel(sectorDto);
      const savedSector = await newSector.save();
      return {
        success: true,
        message: 'Setor criado com sucesso.',
        data: savedSector,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao criar setor.',
        data: errorMessage,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<Sector>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.sectorModel.countDocuments(filter).exec();

    const data = await this.sectorModel
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

  async findOne(id: string): Promise<Sector | null> {
    return this.sectorModel
      .findById(id)
      .populate({
        path: 'units',
        model: 'Unit',
      })
      .exec();
  }

  async update(
    id: string,
    sectorDto: Partial<SectorDto>,
  ): Promise<ApiResponse<Sector | string>> {
    try {
      const updatedBlock = await this.sectorModel
        .findByIdAndUpdate(id, sectorDto, { new: true })
        .exec();

      if (updatedBlock) {
        return {
          success: true,
          message: 'Setor atualizado com sucesso.',
          data: updatedBlock,
        };
      }

      return {
        success: false,
        message: 'Setor não encontrado.',
        data: 'Setor não encontrado.',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao atualizar setor.',
        data: errorMessage,
      };
    }
  }

  async delete(id: string): Promise<ApiResponse<string>> {
    try {
      const result = await this.sectorModel.findByIdAndDelete(id).exec();
      if (result) {
        return {
          success: true,
          message: 'Setor deletado com sucesso.',
          data: id,
        };
      }
      return {
        success: false,
        message: 'Setor não encontrado.',
        data: id,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao deletar Setor.',
        data: errorMessage,
      };
    }
  }
}
