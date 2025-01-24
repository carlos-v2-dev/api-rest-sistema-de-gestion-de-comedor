import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesAccess } from 'src/auth/decorators/roles.decorator';

@Controller('departaments')
export class DepartamentsController {
  constructor(private readonly departamentsService: DepartamentsService) {}

  @Post()
  create(@Body() createDepartamentDto: CreateDepartamentDto) {
    return this.departamentsService.create(createDepartamentDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.departamentsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDepartamentDto: UpdateDepartamentDto) {
    return this.departamentsService.update(id, updateDepartamentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentsService.remove(id);
  }
}
