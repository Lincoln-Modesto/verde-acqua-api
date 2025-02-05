/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Whitelabel, WhitelabelDocument } from './schemas/whitelabel.schema';
import { CreateWhitelabelDto } from './dtos/whitelabel.dto';

@Injectable()
export class WhitelabelService {
  constructor(
    @InjectModel(Whitelabel.name)
    private readonly whitelabelModel: Model<WhitelabelDocument>,
  ) {}

  async create(createWhitelabelDto: CreateWhitelabelDto): Promise<Whitelabel> {
    const whitelabel = new this.whitelabelModel(createWhitelabelDto);
    return whitelabel.save();
  }

  async findAll(): Promise<Whitelabel[]> {
    return this.whitelabelModel.find().exec();
  }

  async findOne(id: string): Promise<Whitelabel> {
    const whitelabel = await this.whitelabelModel.findById(id).exec();
    if (!whitelabel) {
      throw new NotFoundException(`Whitelabel com ID ${id} não encontrado.`);
    }
    return whitelabel;
  }

  async update(
    id: string,
    updateWhitelabelDto: Partial<CreateWhitelabelDto>,
  ): Promise<Whitelabel> {
    const updatedWhitelabel = await this.whitelabelModel
      .findByIdAndUpdate(id, updateWhitelabelDto, { new: true })
      .exec();
    if (!updatedWhitelabel) {
      throw new NotFoundException(`Whitelabel com ID ${id} não encontrado.`);
    }
    return updatedWhitelabel;
  }

  async remove(id: string): Promise<void> {
    const result = await this.whitelabelModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Whitelabel com ID ${id} não encontrado.`);
    }
  }
}
