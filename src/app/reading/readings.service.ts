/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './schemas/readings.schema';
import { ReadingDto } from './dtos/readings.dto';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name)
    private readonly readingModel: Model<Reading>,
  ) {}

  async create(readingDto: ReadingDto): Promise<Reading> {
    const { meter } = readingDto;

    const lastReading = await this.readingModel
      .findOne({ meter })
      .sort({ date: -1 })
      .exec();

    const newReading = new this.readingModel({
      ...readingDto,
      lastRead: lastReading ? lastReading._id : null,
    });

    return newReading.save();
  }

  async findAll({ company, sector, unit, page, limit }) {
    const query: any = {};

    if (company) query.company = company;
    if (sector) query.sector = sector;
    if (unit) query.unit = unit;

    const totalItems = await this.readingModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    const readings = await this.readingModel
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
    return this.readingModel.findById(id).exec();
  }

  async findByMeter({ meter, unit, sector, company, page, limit }) {
    const query: any = { meter };

    if (unit) query.unit = unit;
    else if (sector) query.sector = sector;
    else if (company) query.company = company;

    const totalItems = await this.readingModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;

    const readings = await this.readingModel
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

  async update(id: string, readingDto: ReadingDto) {
    return this.readingModel.findByIdAndUpdate(id, readingDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.readingModel.findByIdAndDelete(id);
  }
}
