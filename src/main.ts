import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './route/app/app.module';
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enable('trust proxy', true)

  app.useGlobalPipes(
    new ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        },
        forbidNonWhitelisted: true,
        whitelist: true
    }),
)

  await app.listen(process.env.PORT || 3000);
  console.dir('App running...', { depth: null })
  
}
bootstrap();
