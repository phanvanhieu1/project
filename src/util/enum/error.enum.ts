import { SetMetadata } from '@nestjs/common'

// eslint-disable-next-line no-shadow
export enum ErrorThrowEnum {
  _IS_NOT_VALID = '_IS_NOT_VALID',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNAUTHORIZED_EXCEPTION = 'UNAUTHORIZED_EXCEPTION',
  ERROR = 'ERROR',
  DUPLICATE_KEY = 'DUPLICATE_KEY',
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHERIZED = 'UNAUTHERIZED',
}

export const ErrorThrow = (...errorThrow: ErrorThrowEnum[]) => SetMetadata('errorThrow', errorThrow)
