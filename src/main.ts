import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './route/app/app.module';
import * as session from 'express-session'
import { ValidationError, ValidationPipe } from '@nestjs/common';
import  AllExceptionsFilter  from './util/filter/all-exceptions.filter';
import ValidationExceptions from './util/exception/validation.exceptions';
import { getUserMiddleware } from './util/middleware/get-user.middleware';
var bodyParser = require('body-parser')
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => new ValidationExceptions(errors),
    }),
  )

  app.useGlobalFilters(new AllExceptionsFilter())
  app.use(bodyParser.urlencoded({ extended: true }))

  await app.listen(process.env.PORT || 3000)
  console.dir('App running...', { depth: null })
  
}
bootstrap();
