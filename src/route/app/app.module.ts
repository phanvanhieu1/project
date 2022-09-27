import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionFilter } from 'src/util/exception/validation.exceptions';
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


@Module({
  imports: [database, variable, RouteModule],
  controllers: [AppController],
  providers: [{
    provide: 'APP_FILTER',
    useClass: AllExceptionFilter,
}, {
    provide: 'APP_INTERCEPTOR',
    useClass: LoggingInterceptor
},
    AppService
]
})
export class AppModule {}
