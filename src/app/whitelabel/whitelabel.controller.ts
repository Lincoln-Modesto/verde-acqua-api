import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { WhitelabelService } from './whitelabel.service';
import { CreateWhitelabelDto } from './dtos/whitelabel.dto';
import { Whitelabel } from './schemas/whitelabel.schema';

@ApiTags('Whitelabel')
@Controller('whitelabel')
export class WhitelabelController {
  constructor(private readonly whitelabelService: WhitelabelService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova whitelabel' })
  async create(
    @Body() createWhitelabelDto: CreateWhitelabelDto,
  ): Promise<Whitelabel> {
    return this.whitelabelService.create(createWhitelabelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as whitelabels' })
  async findAll(): Promise<Whitelabel[]> {
    return this.whitelabelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma whitelabel pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da whitelabel' })
  async findOne(@Param('id') id: string): Promise<Whitelabel> {
    return this.whitelabelService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma whitelabel pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da whitelabel' })
  async update(
    @Param('id') id: string,
    @Body() updateWhitelabelDto: Partial<CreateWhitelabelDto>,
  ): Promise<Whitelabel> {
    return this.whitelabelService.update(id, updateWhitelabelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma whitelabel pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da whitelabel' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.whitelabelService.remove(id);
  }
}
