import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer/controller/customer.controller';
import * as env from 'env-var';
import { ConfigModule } from '@nestjs/config';
import { PainterController } from './painter/controller/painter.controller';
import { CustomerEntModule } from './customer/entity/customerEnt.module';
import { CustomerRepModule } from './customer/repository/customer.module';
import { PainterRepModule } from './painter/repository/painterRep.module';
import { PainterEntModule } from './painter/entity/painterEnt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(env.get('MONGO_URI').required().asString()),
    CustomerRepModule, CustomerEntModule,
    PainterRepModule, PainterEntModule,
  ],
  controllers: [
    CustomerController,
    PainterController
  ],
  providers: [],
})
export class AppModule {}
