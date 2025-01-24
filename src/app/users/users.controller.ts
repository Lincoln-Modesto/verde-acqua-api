import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { UserDto } from './dtos/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, PaginatedResult } from 'src/models/apiResponse';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário (manager ou collaborator)' })
  @Roles('admin', 'manager')
  async create(@Body() user: UserDto): Promise<ApiResponse<User | string>> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    example: '{"role": "colaborator"}',
  })
  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @Roles('admin', 'manager')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '{}',
  ): Promise<PaginatedResult<User>> {
    const parsedFilter = JSON.parse(filter);
    return this.usersService.findAll(page, limit, parsedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @Roles('admin', 'manager')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar um usuário pelo email' })
  @Roles('admin', 'manager')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  @Get('condo/:condo')
  @ApiOperation({ summary: 'Buscar todos os usuários de um condomínio' })
  @Roles('admin', 'manager')
  async findByCondo(@Param('condo') condo: string): Promise<User[]> {
    return this.usersService.findByCondo(condo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  async update(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @Roles('admin', 'manager')
  async delete(@Param('id') id: string): Promise<User | null> {
    return this.usersService.delete(id);
  }
}
