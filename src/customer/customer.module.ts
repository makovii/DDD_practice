import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepoProvider } from './repository/customer-repo.provider';
import { Customer, CustomerSchema } from './repository/customer.model';
import { CustomerEntity } from './entity/customer.entity';
import * as env from 'env-var';
import { PainterModule } from 'src/painter/painter.module';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    PainterModule,
  ],
  providers: [CustomerRepoProvider, CustomerEntity, CustomerService],
  exports: [CustomerRepoProvider, CustomerEntity, CustomerService],
})
export class CustomerModule {}