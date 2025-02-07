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
import { HydrometerReadingService } from './readings.service';
import { HydrometerReadingDto } from './dtos/readings.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Hydrometer Readings')
@Controller('hydrometer-readings')
export class HydrometerReadingController {
  constructor(
    private readonly hydrometerReadingService: HydrometerReadingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova leitura de hidrômetro' })
  create(@Body() createHydrometerReadingDto: HydrometerReadingDto) {
    return this.hydrometerReadingService.create(createHydrometerReadingDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todas as leituras de hidrômetro com paginação',
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
    return this.hydrometerReadingService.findAll({
      company,
      sector,
      unit,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  @Get('by-hydrometer')
  @ApiQuery({
    name: 'hydrometer',
    type: String,
    required: true,
    description: 'ID do hidrômetro',
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
    description: 'Itens por página (padrão: 10)',
  })
  async findByHydrometer(
    @Query('hydrometer') hydrometer: string,
    @Query('unit') unit?: string,
    @Query('sector') sector?: string,
    @Query('company') company?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.hydrometerReadingService.findByHydrometer({
      hydrometer,
      unit,
      sector,
      company,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar leitura específica por ID' })
  @ApiParam({ name: 'id', description: 'ID da leitura de hidrômetro' })
  findOne(@Param('id') id: string) {
    return this.hydrometerReadingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma leitura existente' })
  @ApiParam({ name: 'id', description: 'ID da leitura de hidrômetro' })
  update(
    @Param('id') id: string,
    @Body() updateHydrometerReadingDto: HydrometerReadingDto,
  ) {
    return this.hydrometerReadingService.update(id, updateHydrometerReadingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma leitura' })
  @ApiParam({ name: 'id', description: 'ID da leitura de hidrômetro' })
  remove(@Param('id') id: string) {
    return this.hydrometerReadingService.remove(id);
  }
}
