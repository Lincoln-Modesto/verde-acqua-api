import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { CreateBlockDto } from './dtos/block.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name) private readonly blockModel: Model<BlockDocument>,
  ) {}

  async create(
    createBlockDto: CreateBlockDto,
  ): Promise<ApiResponse<Block | string>> {
    try {
      const newBlock = new this.blockModel(createBlockDto);
      const savedBlock = await newBlock.save();
      return {
        success: true,
        message: 'Bloco criado com sucesso.',
        data: savedBlock,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao criar bloco.',
        data: errorMessage,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<Block>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.blockModel.countDocuments(filter).exec();

    const data = await this.blockModel
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

  async findOne(id: string): Promise<Block | null> {
    return this.blockModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBlockDto: Partial<CreateBlockDto>,
  ): Promise<ApiResponse<Block | string>> {
    try {
      const updatedBlock = await this.blockModel
        .findByIdAndUpdate(id, updateBlockDto, { new: true })
        .exec();

      if (updatedBlock) {
        return {
          success: true,
          message: 'Bloco atualizado com sucesso.',
          data: updatedBlock,
        };
      }

      return {
        success: false,
        message: 'Bloco não encontrado.',
        data: 'Bloco não encontrado.',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao atualizar bloco.',
        data: errorMessage,
      };
    }
  }

  async delete(id: string): Promise<ApiResponse<string>> {
    try {
      const result = await this.blockModel.findByIdAndDelete(id).exec();
      if (result) {
        return {
          success: true,
          message: 'Bloco deletado com sucesso.',
          data: id,
        };
      }
      return {
        success: false,
        message: 'Bloco não encontrado.',
        data: id,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao deletar bloco.',
        data: errorMessage,
      };
    }
  }
}
