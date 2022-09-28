import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response as ExpressResponse } from 'express'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Error } from 'jsonapi-serializer'
import { ExceptionResponse } from '../interface/exception-response.interface'
import { ErrorThrowEnum } from '../enum/error.enum'


@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    const res = ctx.getResponse<ExpressResponse>()
    const exceptionResponse: null | ExceptionResponse = exception.getResponse
      ? (exception.getResponse() as ExceptionResponse)
      : null
    const status: number = exception.getStatus ? exception.getStatus() : 500

    const mongodbCodes = {
      bulkWriteError: 11000, // a duplicate error code in mongoose
    }

    if (exception.code === mongodbCodes.bulkWriteError) {
      return res.status(HttpStatus.CONFLICT).json(
        new Error({
          source: { pointer: '/data/attributes/email' },
          // title: 'Duplicate key',
          code: ErrorThrowEnum.DUPLICATE_KEY,
          detail: exception.message,
        }),
      )
    }

    if (exception.response?.errorType === 'ValidationError') {
      if (exceptionResponse && exceptionResponse.errors && exceptionResponse.errors.length > 0) {
        for (let i = 0; i < exceptionResponse.errors.length; i += 1) {
          if (exceptionResponse.errors[i].meta && exceptionResponse.errors[i].meta[0]) {
            // eslint-disable-next-line prefer-destructuring
            exceptionResponse.errors[i].detail = exceptionResponse.errors[i].meta[0]
            delete exceptionResponse.errors[i].meta
            const _tempField = exceptionResponse.errors[i].source?.pointer || ''
            if (_tempField) {
              const _tempFieldFinal = _tempField.split('data/attributes/')
              if (_tempFieldFinal && _tempFieldFinal.length === 2) {
                exceptionResponse.errors[i].code = `FIELD:${_tempFieldFinal[1]}`
              } else {
                exceptionResponse.errors[i].code = ErrorThrowEnum.ERROR
              }
            } else {
              exceptionResponse.errors[i].code = ErrorThrowEnum.ERROR
            }
          }
        }
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new Error(exceptionResponse ? exceptionResponse.errors : {}))
    }

    const errors: any[] = []
    if (exception?.message) {
      if (exception?.message.indexOf('FILTER|') === 0) {
        const _tempFieldString = exception?.message.split('FILTER|')
        if (_tempFieldString && _tempFieldString.length === 2) {
          const _tempField = _tempFieldString[1].split(',')
          for (let i = 0; i < _tempField.length; i += 1) {
            errors.push({
              code: `FIELD:${_tempField[i]}`,
              detail: `field error: ${_tempField[i]}`,
            })
          }
        }
      }
    }
    if (errors && errors.length > 0) return res.status(status).json({ errors })
    return res.status(status).json(
      new Error({
        title: exceptionResponse?.error,
        code: exception?.message,
        detail: exception?.message,
      }),
    )
  }
}
