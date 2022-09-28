import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggingInterceptor } from 'src/util/interceptor/logging.interceptor';
import { RouteModule } from '../core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


const variable = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});
const link = process.env.MONGO_DATABASE_URL;
const database = MongooseModule.forRoot(link)


async function seedDB() {
    console.log('Seeding database...')
}

seedDB().then(() => { console.log('Seed DB success') });




@Module({
  imports: [database, variable, RouteModule],
  controllers: [AppController],
  providers: [
    AppService
]
})
export class AppModule {}
