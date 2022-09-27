import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    constructor(
    ) { }

    catch(exception: any, host: ArgumentsHost) {
        console.dir(exception, { depth: null })

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status = (exception instanceof HttpException)
            ? exception.getStatus()
            : HttpStatus.BAD_REQUEST

        let messagesError = (exception instanceof HttpException)
            ? (exception.getResponse()['message'] || exception.getResponse())
            : [exception.message]

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toLocaleString(),
                path: request.method.toUpperCase() + ' ' + request.url,
                message: messagesError
            })
    }
}
