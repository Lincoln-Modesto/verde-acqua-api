/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HydrometerReading } from './schemas/readings.schema';
import { HydrometerReadingDto } from './dtos/readings.dto';

@Injectable()
export class HydrometerReadingService {
  constructor(
    @InjectModel(HydrometerReading.name)
    private readonly hydrometerReadingModel: Model<HydrometerReading>,
  ) {}

  async create(
    createHydrometerReadingDto: HydrometerReadingDto,
  ): Promise<HydrometerReading> {
    const { hydrometer } = createHydrometerReadingDto;

    const lastReading = await this.hydrometerReadingModel
      .findOne({ hydrometer })
      .sort({ date: -1 })
      .exec();

    const newReading = new this.hydrometerReadingModel({
      ...createHydrometerReadingDto,
      lastRead: lastReading ? lastReading._id : null,
    });

    return newReading.save();
  }

  async findAll({ company, sector, unit, page, limit }) {
    const query: any = {};

    if (company) query.company = company;
    if (sector) query.sector = sector;
    if (unit) query.unit = unit;

    const totalItems = await this.hydrometerReadingModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    const readings = await this.hydrometerReadingModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 })
      .exec();

    return {
      totalItems,
      totalPages,
      currentPage,
      data: readings,
    };
  }

  async findOne(id: string) {
    return this.hydrometerReadingModel.findById(id).exec();
  }

  async findByHydrometer({ hydrometer, unit, sector, company, page, limit }) {
    const query: any = { hydrometer };

    if (unit) query.unit = unit;
    else if (sector) query.sector = sector;
    else if (company) query.company = company;

    const totalItems = await this.hydrometerReadingModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    const readings = await this.hydrometerReadingModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 })
      .exec();

    return {
      totalItems,
      totalPages,
      currentPage,
      data: readings,
    };
  }

  async update(id: string, updateHydrometerReadingDto: HydrometerReadingDto) {
    return this.hydrometerReadingModel.findByIdAndUpdate(
      id,
      updateHydrometerReadingDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return this.hydrometerReadingModel.findByIdAndDelete(id);
  }
}
