import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ){}

  async register(registerAuthDto: RegisterAuthDto) {
    const {email} = registerAuthDto

    try {
      
      const user = await this.authRepository.findOne({
        where: { email: email}
      })

      if (user) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Email duplicated!'
      })
    }

      return this.authRepository.save({
        ...registerAuthDto
      })

    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }

  }


  async login( loginAuthDto: LoginAuthDto ): Promise<{user: AuthEntity, token:string}> {
    const {password, email} = loginAuthDto
    try {
      const user = await this.authRepository.findOne({
        where:{ email: email}
      });

      if( password !== user.password ){
        throw new ManagerError({
          type: "BAD_REQUEST",
          message: "Credendials not valid!",
        });
      }

      const token = await this.jwtService.signAsync({id: user.id, email: user.email, role: user.role}, { secret: process.env.JWT_SECRET });

      return {
        user,
        token,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
