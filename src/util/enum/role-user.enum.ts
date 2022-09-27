import { SetMetadata } from '@nestjs/common'

// eslint-disable-next-line no-shadow
export enum RoleUserEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',  
}

export const RoleUser = (...roleUser: RoleUserEnum[]) => SetMetadata('roleUser', roleUser)