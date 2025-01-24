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
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dtos/block.dto';
import { Block } from './schemas/block.schema';
import { ApiResponse } from 'src/models/apiResponse';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';

@ApiTags('Blocks')
@ApiBearerAuth()
@Controller('blocks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo bloco' })
  @Roles('admin')
  async create(
    @Body() createBlockDto: CreateBlockDto,
  ): Promise<ApiResponse<Block | string>> {
    return this.blocksService.create(createBlockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os blocos' })
  @Roles('admin', 'manager')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
  ): Promise<ApiResponse<Block[] | string>> {
    const parsedFilter = JSON.parse(filter);
    return this.blocksService.findAll(page, limit, parsedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um bloco pelo ID' })
  @Roles('admin', 'manager')
  async findOne(@Param('id') id: string): Promise<Block | null> {
    return this.blocksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um bloco pelo ID' })
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateBlockDto: Partial<CreateBlockDto>,
  ): Promise<ApiResponse<Block | string>> {
    return this.blocksService.update(id, updateBlockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um bloco pelo ID' })
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<ApiResponse<string>> {
    return this.blocksService.delete(id);
  }
}
