import { MailerModule } from '@nestjs-modules/mailer';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggingInterceptor } from 'src/util/interceptor/logging.interceptor';
import { getUserMiddleware } from 'src/util/middleware/get-user.middleware';
import { RouteCoreModule } from '../core/core.module';
import { PitchController } from '../v1/pitch/pitch.controller';
import { RouteV1Module } from '../v1/v1.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const variable = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});
const link = process.env.MONGO_DATABASE_URL;
const database = MongooseModule.forRoot(link);

async function seedDB() {
  console.log('Seeding database...');
}

seedDB().then(() => {
  console.log('Seed DB success');
});

@Module({
  imports: [
    database,
    variable,
    RouteCoreModule,
    RouteV1Module,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER ,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(getUserMiddleware).forRoutes(
      { path: '/core/user/update-password', method: RequestMethod.POST },
      //api pitch
      { path: 'v1/pitch', method: RequestMethod.GET },
      { path: 'v1/pitch', method: RequestMethod.POST },
      { path: 'v1/pitch/:id', method: RequestMethod.GET },
      { path: 'v1/pitch/:id', method: RequestMethod.PUT },
      { path: 'v1/pitch/:id', method: RequestMethod.DELETE },
      //api employee
      { path: 'v1/employee', method: RequestMethod.GET },
      { path: 'v1/employee', method: RequestMethod.POST },
      { path: 'v1/employee/:id', method: RequestMethod.GET },
      { path: 'v1/employee/:id', method: RequestMethod.PUT },
      { path: 'v1/employee/:id', method: RequestMethod.PATCH },
      { path: 'v1/employee/:id', method: RequestMethod.DELETE },
      //api service
      { path: 'v1/service', method: RequestMethod.GET },
      { path: 'v1/service/order-list', method: RequestMethod.GET },
      { path: 'v1/service/order-list', method: RequestMethod.POST },
      { path: 'v1/service/order-pitch', method: RequestMethod.POST },
      { path: 'v1/service/done-pitch', method: RequestMethod.POST },
      { path: 'v1/service/accept-pitch', method: RequestMethod.POST },
      { path: 'v1/service/:id', method: RequestMethod.GET },
      { path: 'v1/service/:id', method: RequestMethod.PUT },
      { path: 'v1/service/:id', method: RequestMethod.DELETE },
    );
  }
}
