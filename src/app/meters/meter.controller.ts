import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MeterService } from './meter.service';
import { MeterDto } from './dtos/meter.dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Meters')
@Controller('Meters')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo medidor' })
  @ApiResponse({ status: 201, description: 'Medidor criado com sucesso' })
  create(@Body() meterDto: MeterDto) {
    return this.meterService.create(meterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os medidores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de medidores retornada com sucesso',
  })
  findAll() {
    return this.meterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um medidor pelo ID' })
  @ApiResponse({ status: 200, description: 'medidor retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'medidor não encontrado' })
  findOne(@Param('id') id: string) {
    return this.meterService.findOne(id);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Obter medidores por ID da empresa' })
  @ApiResponse({
    status: 200,
    description: 'medidores retornados com sucesso',
  })
  findByCompany(@Param('companyId') companyId: string) {
    return this.meterService.findByCompany(companyId);
  }

  @Get('sector/:sectorId')
  @ApiOperation({ summary: 'Obter medidores por ID do setor' })
  @ApiResponse({
    status: 200,
    description: 'medidores retornados com sucesso',
  })
  findBySector(@Param('sectorId') sectorId: string) {
    return this.meterService.findBySector(sectorId);
  }

  @Get('unit/:unitId')
  @ApiOperation({ summary: 'Obter medidores por ID da unidade' })
  @ApiResponse({
    status: 200,
    description: 'medidores retornados com sucesso',
  })
  findByUnit(@Param('unitId') unitId: string) {
    return this.meterService.findByUnit(unitId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Obter medidores por status' })
  @ApiResponse({
    status: 200,
    description: 'medidores retornados com sucesso',
  })
  findByStatus(@Param('status') status: string) {
    return this.meterService.findByStatus(status);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um medidor pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'medidor atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'medidor não encontrado' })
  update(@Param('id') id: string, @Body() meterDto: MeterDto) {
    return this.meterService.update(id, meterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um medidor pelo ID' })
  @ApiResponse({ status: 200, description: 'medidor removido com sucesso' })
  @ApiResponse({ status: 404, description: 'medidor não encontrado' })
  remove(@Param('id') id: string) {
    return this.meterService.remove(id);
  }
}
