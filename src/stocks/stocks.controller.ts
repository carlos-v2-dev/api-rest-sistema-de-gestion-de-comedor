import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { StockService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesAccess } from 'src/auth/decorators/roles.decorator';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StockService) {}

  @Post()
  
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.stocksService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stocksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.stocksService.remove(id);
  }
}
