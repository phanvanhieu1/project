import { SetMetadata } from '@nestjs/common'

export enum StatusOrderEnum {
    AWAIT = 'AWAIT',
    USING = 'USING',
    HISTORY = 'HISTORY',
}

export const StatusOrder = (...statusOrder: StatusOrderEnum[]) => SetMetadata('statusOrder', statusOrder)