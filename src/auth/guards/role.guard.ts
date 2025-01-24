import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ADMIN_KEY, MASTER_KEY } from 'src/common/constants/keys-role.constant';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ManagerError } from 'src/common/errors/manager.error';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isMaster = this.reflector.get<string>(
      MASTER_KEY,
      context.getHandler(),
    );
    const isAdmin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const roles = this.reflector.get<Array<keyof typeof UserRole>>(
      UserRole,
      context.getHandler(),
    );
    const user = request['user'];

    try {
      if (roles === undefined) {
        if (!isMaster) {
          return true;
        }

        if( user.role === isMaster ){
          return true;
        }

        throw new ManagerError({
          type: "UNAUTHORIZED",
          message: "Unauthorized!",
        })
      }

      const isAuth = roles.some((rol)=>rol===user.role);
      if( !isAuth ){
        throw new ManagerError({
          type: "UNAUTHORIZED",
          message: "Unauthorized!",
        })
      }

      return true;

    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }

    return true;
  }
}
