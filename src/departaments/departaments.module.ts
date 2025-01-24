import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentEntity } from './entities/departament.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DepartamentsController],
  providers: [DepartamentsService],
  imports:[
    TypeOrmModule.forFeature([
      DepartamentEntity
    ]),
    AuthModule,
    UsersModule,
  ]
})
export class DepartamentsModule {}
