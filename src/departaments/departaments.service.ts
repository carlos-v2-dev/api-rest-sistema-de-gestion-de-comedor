import { Injectable } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity } from './entities/departament.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { AllApiResponse, OneApiResponse } from 'src/common/interfaces/response-api.interface';

@Injectable()
export class DepartamentsService {

  constructor(
    @InjectRepository(DepartamentEntity)
    private readonly departamentRepository: Repository<DepartamentEntity>
  ){}

  async create(createDepartamentDto: CreateDepartamentDto): Promise<DepartamentEntity> {
    try {
      const departament = await this.departamentRepository.save(createDepartamentDto);
      if(!departament){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Departament not created!'
        })
      }

      return departament
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<DepartamentEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.departamentRepository.count({ where: { isActive: true } }),
        this.departamentRepository
        .createQueryBuilder('departament')
        .where({ isActive: true })
        .leftJoinAndSelect('departament.services', 'services')
        .take(limit)
        .skip(skip)
        .getMany(),
      ])
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No departaments!"
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

  async findOne(id: string): Promise<OneApiResponse<DepartamentEntity>> {
    try {
      const departament = await this.departamentRepository.createQueryBuilder('departament')
      .where({id, isActive: true})
      .leftJoinAndSelect('departament.services', 'services')
      .getOne();
      
      if (!departament) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'departament not found',
        });
      }

      return{
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        data: departament
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateDepartamentDto: UpdateDepartamentDto): Promise<UpdateResult> {
    try {
      const departament = await this.departamentRepository.update(id, updateDepartamentDto)
      if (departament.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Departament not found',
        });
      }

      return departament;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string) {
    try {
      const departament = await this.departamentRepository.update({ id }, { isActive: false })
      if (departament.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'departament not found',
        });
      }

      return departament;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
