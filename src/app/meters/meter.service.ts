import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meter } from './schemas/meter.schema';
import { MeterDto } from './dtos/meter.dtos';

@Injectable()
export class MeterService {
  constructor(
    @InjectModel(Meter.name)
    private readonly hydrometerModel: Model<Meter>,
  ) {}

  async create(meterDto: MeterDto): Promise<Meter> {
    const createdHydrometer = new this.hydrometerModel(meterDto);
    return createdHydrometer.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Meter[];
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

  async findOne(id: string): Promise<Meter | null> {
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

  async update(id: string, meterDto: MeterDto): Promise<Meter | null> {
    return this.hydrometerModel
      .findByIdAndUpdate(id, meterDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Meter | null> {
    return this.hydrometerModel.findByIdAndDelete(id).exec();
  }
}
