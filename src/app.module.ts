import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controller/customer.controller';
import * as env from 'env-var';
import { CustomerModule } from './repository/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { PainterController } from './controller/painter.controller';
import { PainterModule } from './repository/painter/painter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(env.get('MONGO_URI').required().asString()),
    CustomerModule,
    PainterModule,
    DomainModule,
  ],
  controllers: [
    CustomerController,
    PainterController
  ],
  providers: [],
})
export class AppModule {}
