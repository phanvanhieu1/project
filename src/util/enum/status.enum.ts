import { SetMetadata } from '@nestjs/common'

export enum StatusEnum {
    EMPTY = 'EMPTY',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
}

export const Status = (...status: StatusEnum[]) => SetMetadata('status', status)