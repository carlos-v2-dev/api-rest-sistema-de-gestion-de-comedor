import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  imports: [
    TypeOrmModule.forFeature([
      AuthEntity
    ]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
    
  ],
  exports : [ AuthGuard, RoleGuard],
})
export class AuthModule {}
