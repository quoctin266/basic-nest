import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid Token');
    }

    // check user permission
    const targetMethod = request.method;
    const targetPath: string = request.route.path;
    let allowAll = false;

    const userPermissions: Permission[] = user.permissions ?? [];
    const isExist = userPermissions.find((permission) => {
      return (
        permission.apiPath === targetPath && permission.method === targetMethod
      );
    });

    // let all role use auth API
    if (targetPath.startsWith('/api/v1/auth')) allowAll = true;

    if (!isExist && user.role !== 'ADMIN' && !allowAll)
      throw new ForbiddenException('Access not allow');

    // request.user
    return user;
  }
}
