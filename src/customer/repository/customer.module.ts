import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepoProvider } from './customer-repo.provider';
import { Customer, CustomerSchema } from './customer.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),],
  providers: [CustomerRepoProvider],
  exports: [CustomerRepoProvider],
})
export class CustomerRepModule {}