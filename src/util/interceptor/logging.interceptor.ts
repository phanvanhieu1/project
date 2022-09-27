import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators' // https://rxjs.dev/api/operators

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor() { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const methodName = context.getHandler().name // create
        const controllerName = context.getClass().name // ClassController

        const request = context.switchToHttp().getRequest<Request>()

        const now = Date.now()
        return next
            .handle()
            .pipe(
                tap(() =>
                    console.log(`${request.method.toUpperCase()} ${request.url}: ${controllerName}/${methodName} after... ${Date.now() - now}ms`)
                ),
            )
    }
}
