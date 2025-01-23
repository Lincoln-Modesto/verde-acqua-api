import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CondosService } from './condos.service';
import { CreateCondoDto } from './dtos/condo.dto';
import { ApiResponse } from 'src/models/apiResponse';
import { Condo } from './schemas/condo.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';

@ApiTags('Condos')
@ApiBearerAuth()
@Controller('condos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CondosController {
  constructor(private readonly condosService: CondosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo condomínio' })
  @Roles('admin')
  async create(
    @Body() createCondoDto: CreateCondoDto,
  ): Promise<ApiResponse<Condo | string>> {
    return this.condosService.create(createCondoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os condomínios' })
  @Roles('admin')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
  ): Promise<ApiResponse<Condo[] | string>> {
    const parsedFilter = JSON.parse(filter);
    return this.condosService.findAll(page, limit, parsedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um condomínio' })
  @Roles('admin', 'manager')
  async findOne(@Param('id') id: string): Promise<Condo | null> {
    return this.condosService.findOne(id);
  }
}
