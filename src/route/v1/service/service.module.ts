import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { UserModule } from 'src/route/core/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
