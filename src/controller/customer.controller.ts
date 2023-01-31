import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerEntity } from 'src/domain/entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerEntity: CustomerEntity) {}

  @Post()
  createCustomer(@Body() input: CustomerDto) {
    return this.customerEntity.createCustomer(input.email, input.name);
  }
}
