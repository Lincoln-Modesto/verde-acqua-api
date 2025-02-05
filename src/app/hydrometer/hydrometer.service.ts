import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hydrometer } from './schemas/hydrometer.schema';
import { CreateHydrometerDto } from './dtos/hydrometer.dtos';

@Injectable()
export class HydrometerService {
  constructor(
    @InjectModel(Hydrometer.name)
    private readonly hydrometerModel: Model<Hydrometer>,
  ) {}

  async create(createHydrometerDto: CreateHydrometerDto): Promise<Hydrometer> {
    const createdHydrometer = new this.hydrometerModel(createHydrometerDto);
    return createdHydrometer.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Hydrometer[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.hydrometerModel.countDocuments().exec();
    const data = await this.hydrometerModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Hydrometer | null> {
    return this.hydrometerModel.findById(id).exec();
  }

  async findByCompany(companyId: string, page: number = 1, limit: number = 10) {
    return this.paginatedFind({ company: companyId }, page, limit);
  }

  async findBySector(sectorId: string, page: number = 1, limit: number = 10) {
    return this.paginatedFind({ sector: sectorId }, page, limit);
  }

  async findByUnit(unitId: string, page: number = 1, limit: number = 10) {
    return this.paginatedFind({ unit: unitId }, page, limit);
  }

  async findByStatus(status: string, page: number = 1, limit: number = 10) {
    return this.paginatedFind({ status }, page, limit);
  }

  private async paginatedFind(
    filter: Record<string, any>,
    page: number,
    limit: number,
  ) {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const total = await this.hydrometerModel.countDocuments(filter).exec();
    const data = await this.hydrometerModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    createHydrometerDto: CreateHydrometerDto,
  ): Promise<Hydrometer | null> {
    return this.hydrometerModel
      .findByIdAndUpdate(id, createHydrometerDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Hydrometer | null> {
    return this.hydrometerModel.findByIdAndDelete(id).exec();
  }
}
