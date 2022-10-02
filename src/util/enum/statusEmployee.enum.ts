import { SetMetadata } from '@nestjs/common';

export enum StatusEmployeeEnum {
  ON = 'ON',
    OFF = 'OFF',
}

export const StatusEmployee = (...StatusEmployee: StatusEmployeeEnum[]) =>
  SetMetadata('status', StatusEmployee);
