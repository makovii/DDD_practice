import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer/controller/customer.controller';
import * as env from 'env-var';
import { ConfigModule } from '@nestjs/config';
import { PainterController } from './painter/controller/painter.controller';
import { CustomerModule } from './customer/customer.module';
import { PainterModule } from './painter/painter.module';
import { AuthController } from './auth/controller/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(env.get('MONGO_URI').required().asString()),
    CustomerModule,
    PainterModule,
    AuthModule,
  ],
  controllers: [
    AuthController,
    CustomerController,
    PainterController
  ],
  providers: [],
})
export class AppModule {}
