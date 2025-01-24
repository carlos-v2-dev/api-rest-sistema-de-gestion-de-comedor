import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { AllApiResponse, OneApiResponse } from 'src/common/interfaces/response-api.interface';

@Injectable()
export class ServicesService {
  
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>
  ){}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    try {
      const services = await this.servicesRepository.save(createServiceDto);
      if(!services){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'services not created!'
        })
      }

      return services
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<ServiceEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.servicesRepository.count({ where: { isActive: true } }),
        this.servicesRepository
          .createQueryBuilder('service')
          .where({ isActive: true })
          .leftJoinAndSelect('service.departament', 'departament')
          .leftJoinAndSelect('service.user', 'user')
          .take(limit)
          .skip(skip)
          .getMany(),
      ]);

      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No services!"
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

  async findOne(id: string): Promise<OneApiResponse<ServiceEntity>> {
    try {
      const services = await this.servicesRepository
      .createQueryBuilder('service')
      .where({id,  isActive: true })
      .leftJoinAndSelect('service.departament', 'departament')
      .getOne()
      
      if (!services) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'services not found',
        });
      }

      return {
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        data: services
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateservicesDto: UpdateServiceDto): Promise<UpdateResult> {
    try {
      const services = await this.servicesRepository.update(id, updateservicesDto)
      if (services.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'services not found',
        });
      }

      return services;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string) {
    try {
      const services = await this.servicesRepository.update({ id }, { isActive: false })
      if (services.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'services not found',
        });
      }

      return services;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
