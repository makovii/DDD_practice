import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer.model';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class CustomerModule {}