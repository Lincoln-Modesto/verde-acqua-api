import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { HydrometerService } from './hydrometer.service';
import { CreateHydrometerDto } from './dtos/hydrometer.dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hydrometers')
@Controller('hydrometers')
export class HydrometerController {
  constructor(private readonly hydrometerService: HydrometerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo hidrômetro' })
  @ApiResponse({ status: 201, description: 'Hidrômetro criado com sucesso' })
  create(@Body() createHydrometerDto: CreateHydrometerDto) {
    return this.hydrometerService.create(createHydrometerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os hidrômetros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de hidrômetros retornada com sucesso',
  })
  findAll() {
    return this.hydrometerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um hidrômetro pelo ID' })
  @ApiResponse({ status: 200, description: 'Hidrômetro retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Hidrômetro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.hydrometerService.findOne(id);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Obter hidrômetros por ID da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetros retornados com sucesso',
  })
  findByCompany(@Param('companyId') companyId: string) {
    return this.hydrometerService.findByCompany(companyId);
  }

  @Get('sector/:sectorId')
  @ApiOperation({ summary: 'Obter hidrômetros por ID do setor' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetros retornados com sucesso',
  })
  findBySector(@Param('sectorId') sectorId: string) {
    return this.hydrometerService.findBySector(sectorId);
  }

  @Get('unit/:unitId')
  @ApiOperation({ summary: 'Obter hidrômetros por ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetros retornados com sucesso',
  })
  findByUnit(@Param('unitId') unitId: string) {
    return this.hydrometerService.findByUnit(unitId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Obter hidrômetros por status' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetros retornados com sucesso',
  })
  findByStatus(@Param('status') status: string) {
    return this.hydrometerService.findByStatus(status);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um hidrômetro pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Hidrômetro atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Hidrômetro não encontrado' })
  update(
    @Param('id') id: string,
    @Body() createHydrometerDto: CreateHydrometerDto,
  ) {
    return this.hydrometerService.update(id, createHydrometerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um hidrômetro pelo ID' })
  @ApiResponse({ status: 200, description: 'Hidrômetro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Hidrômetro não encontrado' })
  remove(@Param('id') id: string) {
    return this.hydrometerService.remove(id);
  }
}
