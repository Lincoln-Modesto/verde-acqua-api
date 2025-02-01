/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { SectorService } from './sectors.service';
import { SectorDto } from './dtos/sector.dto';
import { Sector } from './schemas/sector.schema';
import { ApiResponse } from 'src/models/apiResponse';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';

@ApiTags('Sectors')
@ApiBearerAuth()
@Controller('sectors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo setor' })
  @Roles('admin')
  async create(
    @Body() sectorDto: SectorDto,
  ): Promise<ApiResponse<Sector | string>> {
    return this.sectorService.create(sectorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os setores' })
  @Roles('admin', 'manager')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
  ): Promise<ApiResponse<Sector[] | string>> {
    const parsedFilter = JSON.parse(filter);
    return this.sectorService.findAll(page, limit, parsedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um setor pelo ID' })
  @Roles('admin', 'manager')
  async findOne(@Param('id') id: string): Promise<Sector | null> {
    return this.sectorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um setor pelo ID' })
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() sectorDto: Partial<SectorDto>,
  ): Promise<ApiResponse<Sector | string>> {
    return this.sectorService.update(id, sectorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um setor pelo ID' })
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<ApiResponse<string>> {
    return this.sectorService.delete(id);
  }
}
