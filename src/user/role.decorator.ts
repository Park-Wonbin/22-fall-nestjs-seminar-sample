import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user.meta';

export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata('user_roles', roles);
