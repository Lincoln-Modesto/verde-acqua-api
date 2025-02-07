import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ReadingService } from './readings.service';
import { ReadingDto } from './dtos/readings.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Readings')
@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova leitura de Medidor' })
  create(@Body() readingDto: ReadingDto) {
    return this.readingService.create(readingDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todas as leituras de Medidor com paginação',
  })
  @ApiQuery({
    name: 'company',
    required: false,
    description: 'Filtrar por empresa',
  })
  @ApiQuery({
    name: 'sector',
    required: false,
    description: 'Filtrar por setor',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Quantidade por página',
    example: 10,
  })
  findAll(
    @Query('company') company?: string,
    @Query('sector') sector?: string,
    @Query('unit') unit?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.readingService.findAll({
      company,
      sector,
      unit,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  @Get('by-meter')
  @ApiQuery({
    name: 'meter',
    type: String,
    required: true,
    description: 'ID do Medidor',
  })
  @ApiQuery({
    name: 'unit',
    type: String,
    required: false,
    description: 'ID da unidade',
  })
  @ApiQuery({
    name: 'sector',
    type: String,
    required: false,
    description: 'ID do setor',
  })
  @ApiQuery({
    name: 'company',
    type: String,
    required: false,
    description: 'ID da empresa',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Número da página (padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Itens por página (padrão: 20)',
  })
  async findByMeter(
    @Query('meter') meter: string,
    @Query('unit') unit?: string,
    @Query('sector') sector?: string,
    @Query('company') company?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.readingService.findByMeter({
      meter,
      unit,
      sector,
      company,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar leitura específica por ID' })
  @ApiParam({ name: 'id', description: 'ID da leitura de Medidor' })
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma leitura existente' })
  @ApiParam({ name: 'id', description: 'ID da leitura de Medidor' })
  update(@Param('id') id: string, @Body() readingDto: ReadingDto) {
    return this.readingService.update(id, readingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma leitura' })
  @ApiParam({ name: 'id', description: 'ID da leitura de Medidor' })
  remove(@Param('id') id: string) {
    return this.readingService.remove(id);
  }
}
