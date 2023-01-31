import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/repository/customer/customer.module';
import { CustomerEntity } from './entity/customer.entity';

@Module({
  imports: [CustomerModule],
	providers: [CustomerEntity],
	exports: [CustomerEntity],
})
export class DomainModule {}