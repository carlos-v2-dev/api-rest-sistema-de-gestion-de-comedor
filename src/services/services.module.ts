import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    TypeOrmModule.forFeature([ServiceEntity])
  ]
})
export class ServicesModule {}
