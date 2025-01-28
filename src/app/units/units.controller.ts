import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UnitsService } from './units.service';
import { UnitDto } from './dtos/unit.dto';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';
import { Unit } from './schemas/unit.schema';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorators';

@ApiTags('Units')
@ApiBearerAuth()
@Controller('units')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova unidade' })
  @Roles('admin')
  async create(
    @Body() createUnitDto: UnitDto,
  ): Promise<ApiResponse<Unit | string>> {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar unidades com paginação' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filter: Record<string, any>,
  ): Promise<PaginatedResult<Unit>> {
    return this.unitsService.findAll(page, limit, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma unidade pelo ID' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<Unit | string>> {
    return this.unitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma unidade pelo ID' })
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: Partial<UnitDto>,
  ): Promise<ApiResponse<Unit | string>> {
    return this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma unidade pelo ID' })
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<ApiResponse<string>> {
    return this.unitsService.delete(id);
  }
}
