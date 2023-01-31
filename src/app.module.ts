import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controller/customer.controller';
import * as env from 'env-var';
import { CustomerModule } from './repository/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(env.get('MONGO_URI').required().asString()),
    CustomerModule,
    DomainModule,
  ],
  controllers: [CustomerController],
  providers: [],
})
export class AppModule {}
