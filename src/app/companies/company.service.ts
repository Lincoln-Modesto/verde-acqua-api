import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CompanyDto } from './dtos/company.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(companyDto: CompanyDto): Promise<ApiResponse<Company | string>> {
    try {
      const newCompany = new this.companyModel(companyDto);
      const savedCompany = await newCompany.save();
      return {
        success: true,
        message: 'Empresa criada com sucesso.',
        data: savedCompany,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao criar empresa.',
        data: errorMessage,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<PaginatedResult<Company>> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.companyModel.countDocuments(filter).exec();

    const data = await this.companyModel
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

  async findOne(id: string): Promise<Company | null> {
    return this.companyModel
      .findById(id)
      .populate({
        path: 'sectors',
        model: 'Sectors',
        populate: {
          path: 'units',
          model: 'Unit',
        },
      })
      .exec();
  }

  async update(
    id: string,
    company: Partial<Company>,
  ): Promise<ApiResponse<Company | string>> {
    try {
      const companyUpdated = await this.companyModel
        .findByIdAndUpdate(id, company, { new: true })
        .exec();
      return {
        success: true,
        message: 'Empresa atualizada com sucesso.',
        data: companyUpdated ?? 'Empresa não encontrada.',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido.';
      return {
        success: false,
        message: 'Erro ao atualizar empresa.',
        data: errorMessage,
      };
    }
  }

  async delete(id: string): Promise<Company | null> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
