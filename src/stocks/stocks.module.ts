import { Module } from '@nestjs/common';
import { StockService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';

@Module({
  controllers: [StocksController],
  providers: [StockService],
  imports: [
    TypeOrmModule.forFeature([StockEntity])
  ]
})
export class StocksModule {}
