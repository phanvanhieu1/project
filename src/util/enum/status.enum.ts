import { SetMetadata } from '@nestjs/common'

export enum StatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export const Status = (...status: StatusEnum[]) => SetMetadata('status', status)