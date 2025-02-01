/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dtos/company.dto';
import { ApiResponse } from 'src/models/apiResponse';
import { Company } from './schemas/company.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('Company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @Roles('admin')
  async create(
    @Body() companyDto: CompanyDto,
  ): Promise<ApiResponse<Company | string>> {
    return this.companyService.create(companyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as empresas' })
  @Roles('admin')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
  ): Promise<ApiResponse<Company[] | string>> {
    const parsedFilter = JSON.parse(filter);
    return this.companyService.findAll(page, limit, parsedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma empresa' })
  @Roles('admin', 'manager')
  async findOne(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findOne(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar uma empresa' })
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() companyDto: CompanyDto,
  ): Promise<ApiResponse<Company | string>> {
    return this.companyService.update(id, companyDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar uma empresa' })
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
