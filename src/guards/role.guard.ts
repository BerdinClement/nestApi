import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.headers['authorization']) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    const token = request.headers['authorization'].replace('Bearer ', '');
    const res = await fetch(`http://localhost:9081/introspection/${token}`);
    const data = await res.json();
    if (data.error) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    const userRoles = data.roles;
    request.roles = userRoles;
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
