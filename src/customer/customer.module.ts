import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepoProvider } from './repository/customer-repo.provider';
import { Customer, CustomerSchema } from './repository/customer.model';
import { CustomerEntity } from './entity/customer.entity';
import * as env from 'env-var';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    // JwtModule.register({
    //   secret: env.get('PRIVATE_KEY').required().asString(),
    //   signOptions: {
    //     expiresIn: '24h',
    //   },
    // }),
  ],
  providers: [CustomerRepoProvider, CustomerEntity],
  exports: [CustomerRepoProvider, CustomerEntity],
})
export class CustomerModule {}