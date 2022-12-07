import { SetMetadata } from '@nestjs/common';
import { AccountEnum } from '../enum';

export const ROLES_KEY = 'account_type';
export const RolesDecorator = (...roles: AccountEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
