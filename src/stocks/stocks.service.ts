import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { AllApiResponse, OneApiResponse } from 'src/common/interfaces/response-api.interface';

@Injectable()
export class StockService {
  
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>
  ){}

  async create(createStockDto: CreateStockDto): Promise<StockEntity> {
    try {
      const stock = await this.stockRepository.save(createStockDto);
      if(!stock){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Stock not created!'
        })
      }

      return stock
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<StockEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.stockRepository.count({ where: { isActive: true } }),
        this.stockRepository
          .createQueryBuilder('Stock')
          .where({ isActive: true })
          .take(limit)
          .skip(skip)
          .getMany(),
      ]);

      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No Stock!"
        })
      }

      return {
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        meta: {
          page,
        limit,
        lastPage,
        total,
        },
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
    
  }

  async findOne(id: string): Promise<OneApiResponse<StockEntity>> {
    try {
      const Stock = await this.stockRepository
      .createQueryBuilder('Stock')
      .where({id,  isActive: true })
      .leftJoinAndSelect('Stock.departament', 'departament')
      .getOne()
      
      if (!Stock) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Stock not found',
        });
      }

      return {
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        data: Stock
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto): Promise<UpdateResult> {
    try {
      const Stock = await this.stockRepository.update(id, updateStockDto)
      if (Stock.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Stock not found',
        });
      }

      return Stock;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string) {
    try {
      const Stock = await this.stockRepository.update({ id }, { isActive: false })
      if (Stock.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Stock not found',
        });
      }

      return Stock;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
